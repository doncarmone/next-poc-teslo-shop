'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
  const productsIncart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      {productsIncart.map((product) => (
        <div key={`$${product.slug + product.size}`} className='flex mb-5'>
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            className='mr-5 rounded-lg'
          />
          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
