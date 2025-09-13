'use server';
import { Gender, Product, Size } from '@/generated/prisma';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL || '');

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(2).max(100),
    slug: z.string().min(2).max(100),
    description: z.string().min(2).max(1000),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.string().max(100),
    gender: z.enum(Gender),
});

export const createOrUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const parsedData = productSchema.safeParse(data);
    if (!parsedData.success) {
        console.error('Validation errors:', parsedData.error);
        return { ok: false, errors: parsedData.error };
    }


    const product = parsedData.data;

    product.slug = product.slug.toLowerCase()
        .replace(/ /g, '-').trim()

    const { id, ...rest } = product;

    try {
        const prismaTX = await prisma.$transaction(async (tx) => {
            let product: Product;
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

            if (id) {
                product = await tx.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
                console.log('Product updated:', product);

                //ravalidate path

            } else {
                // Create new product
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: rest.sizes as Size[],
                        tags: tagsArray
                    }
                })
                console.log('Product created:', product);
            }

            //proceso de carga  de imagenes
            if (formData.getAll('images')) {

                const images = await uplodadImage(formData.getAll('images') as File[])
                if (!images) {
                    throw new Error('Error uploading images');
                }

                await prisma.productImage.createMany({
                    data: images.map(url => ({
                        url,
                        productId: product.id
                    }))
                })
                console.log('Images uploaded and associated with product');
            }


            return { product }
        })

        //REVALIDATE PATH
        revalidatePath('/admin/products');
        revalidatePath(`/admin/products/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);
        return { ok: true, product: prismaTX.product };


    } catch (error) {
        console.error('Database error:', error);
        return { ok: false, error: 'Database error' };
    }
}

const uplodadImage = async (images: File[]) => {

    try {
        const uploadPromises = images.map(async (image) => {
            const buffer = await image.arrayBuffer();
            const base64Image = Buffer.from(buffer).toString('base64');
            return await cloudinary.uploader.upload(`data:${image.type};base64,${base64Image}`)
                .then(r => r.secure_url)
        })

        const imageUrls = await Promise.all(uploadPromises);
        return imageUrls;
    } catch (error) {
        console.error('Error uploading images:', error);
        return null;
    }

}