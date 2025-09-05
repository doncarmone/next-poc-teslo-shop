import React from 'react';
import Link from 'next/link';
import { titleFont } from '@/config/fonts';

export const Footer = () => {
  return (
    <div className='flex w-full justify-center text-xs mb-10'>
      <Link href='/'>
        <span className={`${titleFont} antialiased font-bold`}>Teslo</span>
        <span className='mr-1'>| Shop</span>
        <span className='mr-1'> {new Date().getFullYear()}</span>
      </Link>

      <Link href='/' className='mx-3'>
        <span className='mr-1'>Legal</span>
      </Link>
      <Link href='/' className='mx-3'>
        <span className='mr-1'>Privacidad</span>
      </Link>
    </div>
  );
};
