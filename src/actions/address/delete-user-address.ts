'use server';
import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {

        const deletedAddress = await prisma.userAddress.delete({
            where: {
                userId: userId
            },
        });
        return {
            ok: true,
            address: deletedAddress
        }


    } catch (error) {
        console.error('Error deleting user address:', error);
        return {
            ok: false,
            error: 'Error deleting user address'
        };
    }
}