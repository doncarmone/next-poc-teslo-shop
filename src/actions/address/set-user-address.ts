'use server';

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";


export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const newAddress = await createOrReplaceAddress(address, userId);
        return {
            ok: true,
            address: newAddress
        }
    } catch (error) {
        console.error('Error setting user address:', error);
    }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storedAdress = await prisma.userAddress.findUnique({
            where: {
                userId,
            },
        });


        const addressToSave = {
            address: address.address,
            address2: address.address2 || null,
            city: address.city,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            userId: userId
        }

        if (!storedAdress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            });
            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId,
            },
            data: addressToSave
        });

        return updatedAddress;

    } catch (error) {
        console.error('Error creating or replacing user address:', error);
    }

}