'use client';
import React, { useState } from 'react';
import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link className='text-blue-600' href={`/product/${product.slug}`}>
        <Image
          className='w-full object-cover rounded'
          src={`/products/${displayImage}`}
          alt={product.title}
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className='p-4 flex flex-col'>
        <Link className='hover:text-blue-600' href={`/product/${product.slug}`}>
          <h3 className='font-bold'>{product.title}</h3>
          <span className='font-semibold'>${product.price}</span>
        </Link>
      </div>
    </div>
  );
};
