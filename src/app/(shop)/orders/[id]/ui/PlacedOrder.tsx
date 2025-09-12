import { Order } from '@/interfaces';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';
import { currencyFormat } from '../../../../../utils/currencyFormat';
import { Country } from '../../../../../generated/prisma/index';

interface Props {
  order: Order;
}

export const PlacedOrder = ({ order }: Props) => {
  const { orderAdress, products } = order;
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
      {/* Cart items will be displayed here */}
      <div className='flex flex-col mt-5'>
        <div
          className={clsx(
            'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
            {
              'bg-red-500': order.isPaid === false,
              'bg-green-700': order.isPaid === true,
            }
          )}
        >
          <IoCardOutline size={30} />
          {order.isPaid ? (
            <span className='mx-2'>Orden ya fue pagada</span>
          ) : (
            <span className='mx-2'>Pendiente de pago</span>
          )}
        </div>

        {/* items */}

        {order.products.map((product) => (
          <div key={product.slug} className='flex mb-5'>
            <Image
              src={`/products/${product.images[0]}`}
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
              <p>{product.title}</p>
              <p>Subtotal ${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Example cart item */}
      <div className='bg-white rounded-xl shadow-xl p-7'>
        <h2 className='text-2xl font-bold mb-2'>Direccion de entrega</h2>
        <div className='mb-10'>
          <p className='font-bold'></p>
          <p>{orderAdress.address}</p>
          <p>{orderAdress.address2}</p>
          <p>{orderAdress.postalCode}</p>
          <p>{orderAdress.city}</p>
          <p>{orderAdress.countryId}</p>
          <p>{orderAdress.phone} </p>
        </div>

        {/* divider */}
        <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

        <h2 className='text-2xl font-bold mb-2'>Resumen de orden</h2>
        <div className='grid grid-cols-2'>
          <span>No. Articulos:</span>
          <span className='text-right'>{order.itemsInOrder} Articulos</span>
          <span>Subtotal</span>
          <span className='text-right'>{currencyFormat(order.subtotal)}</span>
          <span>Impuestos (15%)</span>
          <span className='text-right'>{currencyFormat(order.tax)}</span>
          <span className='text-2xl mt-5'>Total Price:</span>
          <span className='text-2xl mt-5 text-right'>
            {currencyFormat(order.total)}
          </span>
        </div>

        <div
          className={clsx(
            'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
            {
              'bg-red-500': order.isPaid === false,
              'bg-green-700': order.isPaid === true,
            }
          )}
        >
          <IoCardOutline size={30} />
          {order.isPaid ? (
            <span className='mx-2'>Orden ya fue pagada</span>
          ) : (
            <span className='mx-2'>Pendiente de pago</span>
          )}
        </div>
      </div>
    </div>
  );
};
