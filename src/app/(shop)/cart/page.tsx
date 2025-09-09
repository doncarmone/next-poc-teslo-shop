import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSumary';

export default function CartPage() {
  // redirect('/empty');

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Carrito' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart items will be displayed here */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Agregar mas items</span>
            <Link href='/' className='underline mb-5'>
              Continua comprando
            </Link>

            {/* items */}
            <ProductsInCart />
          </div>

          {/* Example cart item*/}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl font-bold mb-2'>Resumen de orden</h2>

            <OrderSummary />

            <div>
              <Link
                href='/checkout/address'
                className='flex btn btn-primary mt-5 w-full justify-center'
              >
                Ir a checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
