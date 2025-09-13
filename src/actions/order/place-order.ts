'use server';

import { auth } from "@/auth.config";
import type { Size, Address } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productsIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id
    if (!userId) {
        return { ok: false, message: 'No estás autenticado' };
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productsIds.map(p => p.productId)
            }
        }
    });

    const itemsInOrder = productsIds.reduce((count, p) => count + p.quantity, 0);

    const { subTotal, tax, total } = productsIds.reduce((totals, item) => {


        const productQuantity = item.quantity
        const product = products.find(p => p.id === item.productId);
        if (!product) throw new Error('Producto no encontrado');

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;


        return totals
    }, { subTotal: 0, tax: 0, total: 0 })

    try {

        const prismaTx = await prisma.$transaction(async (tx) => {

            //1.- Actualizar el stock

            const updatedProductsPromises = products.map((product) => {

                //Acumular valores
                const productQuantity = productsIds.filter(
                    p => p.productId === product.id
                ).reduce((count, p) => count + p.quantity, 0);

                if (productQuantity === 0) {
                    throw new Error('No hay productos a ordenar');
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });

            })

            const updatedProducts = await Promise.all(updatedProductsPromises);

            updatedProducts.forEach((producto) => {
                if (producto.inStock < 0) {
                    throw new Error(`El producto ${producto.title} está agotado`);
                }
            });

            //2.- Crear la orden - encabezado - detalle

            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subtotal: subTotal,
                    tax: tax,
                    total: total,
                    OrderItem: {
                        createMany: {
                            data: productsIds.map(p => ({
                                productId: p.productId,
                                quantity: p.quantity,
                                size: p.size,
                                price: products.find(prod => prod.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            });

            //validar, si el price es cero, mandar error

            //3.- Crear la dirección de la orden

            const country = await tx.country.findUnique({
                where: {
                    id: address.country
                }
            });

            const orderAddress = await tx.orderAdress.create({
                data: {
                    orderId: order.id,
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    city: address.city,
                    countryId: country?.id,
                    phone: address.phone,
                    postalCode: address.postalCode
                }
            });

            return { order, orderAddress, updatedProducts };
        });
        return { ok: true, order: prismaTx.order, prismaTx: prismaTx };
        // eslint-disable-next-line
    } catch (error: any) {
        console.log(error);
        return { ok: false, message: error?.message };
    }

};