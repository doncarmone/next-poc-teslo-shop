'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            redirect: false,
            email: formData.get('email')?.toString(),
            password: formData.get('password')?.toString(),
            callbackUrl: prevState || '/',
        });
        return null;
    } catch (error) {
        console.log('Error', error);
        if (isRedirectError(error)) throw error;
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


export const login = async (email: string, password: string) => {

    try {

        await signIn('credentials', { email, password })

        return { ok: true };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo iniciar sesión'
        }

    }


}