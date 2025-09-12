import Link from 'next/link';
import Image from 'next/image';
import { Title } from '../../../components/ui/title/Title';
import { ProductsInCart } from './(checkout)/ui/ProductsInCart';
import { PlaceOrder } from './(checkout)/ui/PlaceOrder';

export default function AdminPage() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Verificar Orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart items will be displayed here */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Ajustar elementos</span>
            <Link href='/cart' className='underline mb-5'>
              Editar Carrito
            </Link>

            {/* items */}

            <ProductsInCart />
          </div>

          {/* Example cart item */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
