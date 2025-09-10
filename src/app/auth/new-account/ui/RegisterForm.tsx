'use client';

import { login, registerUser } from '@/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    setError('');
    const { name, email, password } = data;
    const resp = await registerUser(name, email, password);
    console.log(resp);
    if (!resp.ok) {
      setError(resp.message || 'Error en el servidor');
    }
    await login(email.toLowerCase(), password);
    window.location.replace('/');
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {errors.name && (
        <span className='text-red-500'>El nombre es obligatorio</span>
      )}
      <label htmlFor='text'>Nombre</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='text'
        autoFocus
        {...register('name', { required: true })}
      />
      {errors.email && errors.email.type === 'required' && (
        <span className='text-red-500'>El correo es obligatorio</span>
      )}
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.password && (
        <span className='text-red-500'>La contraseña es obligatoria</span>
      )}
      <label htmlFor='password'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        {...register('password', { required: true, minLength: 4 })}
      />

      {error && <span className='text-red-500'>{error}</span>}

      <button className='btn-primary'>Crear Cuenta</button>
      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>
      <Link href='/auth/login' className='btn-secondary text-center'>
        Ir a Login
      </Link>
    </form>
  );
};
