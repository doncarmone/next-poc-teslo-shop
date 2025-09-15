'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL || '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {

    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            message: 'Invalid image URL'
        };
    }

    try {
        const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
        await cloudinary.uploader.destroy(imageName);

        await prisma.productImage.delete({
            where: { id: imageId },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        });

        revalidatePath(`/admin/products/`);
        revalidatePath(`/admin/product/{deletedImage.product.slug}`);
        revalidatePath(`/product/{deletedImage.product.slug}`);
        return { ok: true };


    } catch (error) {
        console.error('Error deleting product image:', error);
    }
}