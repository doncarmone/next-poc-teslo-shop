'use client';

import Link from 'next/link';
import { authenticate } from '@/actions/auth/login';

export const LoginForm = () => {

  const credentialsAction = (formData: FormData) => {
    authenticate(undefined, formData);
    window.location.replace('/');
  };

  return (
    <form action={credentialsAction} className='flex flex-col'>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
      />

      <label htmlFor='email'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />

      {/* <div
        className='flex h-8 items-end space-x-1'
        aria-live='polite'
        aria-atomic='true'
      >
        {errorMessage && (
          <div className='mb-2 flex items-center space-x-1'>
            <IoWarning className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>{errorMessage}</p>
          </div>
        )}
      </div> */}

      <button
        type='submit'
        // className={clsx({
        //   'btn-primary': !isPending,
        //   'btn-disabled': isPending,
        // })}
        // aria-disabled={isPending}
        // disabled={isPending}
        className={'btn-primary'}
      >
        Ingresar
      </button>

      {/* 
      <input type='hidden' name='redirectTo' value={callbackUrl} />
      <Button className='mt-4 w-full' aria-disabled={isPending}>
        Log in <ArrowRightIcon className='ml-auto h-5 w-5 text-gray-50' />
      </Button> */}
      {/* <input type='hidden' name='redirectTo' value={callbackUrl} /> */}
      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
