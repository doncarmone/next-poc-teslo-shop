'use client';

import { placeOrder } from '@/actions/order/place-order';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
      size: p.size,
    }));

    const resp = await placeOrder(productsToOrder, address!);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    clearCart();
    router.replace(`/orders/${resp.order?.id}`);
  };

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl font-bold mb-2'>Direccion de entrega</h2>
      <div className='mb-10'>
        <p className='font-bold'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city} {address.country}
        </p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

      <h2 className='text-2xl font-bold mb-2'>Resumen de orden</h2>
      <div className='grid grid-cols-2'>
        <span>No. Productos</span>
        <span className='text-right'>
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='mt-5 text-2xl'>Total:</span>
        <span className='mt-5 text-2xl text-right'>
          {currencyFormat(total)}
        </span>
      </div>

      <div>
        <p className='text-sm text-gray-500 mt-5'>
          disclaimer: al dar click en colocar orden se genera una orden de
          manera automatica sin pasar por ningun proceso de pago
        </p>

        <p className='text-red-500 mt-1 mb-1'>{errorMessage}</p>
        <button
          //   href='/orders/123'
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
