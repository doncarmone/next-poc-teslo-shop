'use client';
import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
  const productsIncart = useCartStore((state) => state.cart);
  const updateCartQuantity = useCartStore((state) => state.updateCartQuantity);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

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
            <Link
              href={`/product/${product.slug}`}
              className='font-bold hover:underline cursor-pointer'
            >
              {product.size} - {product.title}
            </Link>
            <p> ${product.price} </p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateCartQuantity(product, quantity)
              }
            />
            <button
              className='underline mt-3'
              onClick={() => removeProductFromCart(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
