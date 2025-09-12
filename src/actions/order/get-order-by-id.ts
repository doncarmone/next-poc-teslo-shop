'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getOrderById = async (orderId: string) => {
    const session = await auth();
    if (!session) {
        return {
            ok: false,
            message: 'No autorizado',
            order: null,
        }
    }
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
            include: {
                OrderAdress: true,
                OrderItem: true,
            },
        });
        if (!order) return null;

        const { OrderAdress, OrderItem, ...rest } = order;

        const dbProducts = await prisma.product.findMany({
            where: {
                id: {
                    in: OrderItem.map((item) => item.productId),
                },
            },
            include: {
                ProductImage: true,
            },
        });

        const products = dbProducts.map(({ ProductImage, ...product }) => ({
            ...product,
            images: ProductImage.map((image) => image.url),
        }));

        const orderFromDB = {
            ...rest,
            orderAdress: OrderAdress!,
            products: products!
        }

        return {
            ok: true,
            order: orderFromDB,
        };
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        return {
            ok: false,
            message: 'Error fetching order',
            order: null,
        };
    }
}