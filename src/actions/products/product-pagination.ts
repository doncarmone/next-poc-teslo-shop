'use server';

import { Gender } from "@/generated/prisma/edge";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}


export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {

    if (isNaN(Number(page)) || isNaN(Number(take))) {
        page = 1;
        take = 12;
    }
    if (page < 1) page = 1;
    if (take < 1) take = 12;
    try {
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            //! Por género
            where: {
                gender: gender
            },
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            },
        });

        //Todo: 
        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        });
        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalProducts: products.length,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(img => img.url)
            }))
        };
    } catch (error) {
        throw new Error(`Error al obtener los productos: ${error}`);
    }
}
