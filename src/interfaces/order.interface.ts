import { Product } from "./product.interface";


export interface OrderAddress {
    address: string;
    id: string;
    firstName: string;
    lastName: string;
    address2: string | null;
    postalCode: string;
    city: string;
    phone: string;
    countryId: string;
    orderId: string;
}

export interface Order {
    orderAdress: OrderAddress;
    products: Product[]
    id: string;
    userId: string;
    subtotal: number;
    tax: number;
    total: number;
    itemsInOrder: number;
    isPaid: boolean;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}