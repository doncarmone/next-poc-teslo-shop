import Link from 'next/link';
import Image from 'next/image';
import { Title } from '../../../components/ui/title/Title';
import { initialData } from '@/seed/seed';
import { QuantitySelector } from '@/components';
import { redirect } from 'next/navigation';

const productsIncart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export default function AdminPage() {
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

            {productsIncart.map((product) => (
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
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className='underline mt-3'>Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Example cart item */}
          <div className='bg-white rounded-xl shadow-xl p-7 h-fit'>
            <h2 className='text-2xl font-bold mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>
              <span>No. Articulos:</span>
              <span className='text-right'>
                {productsIncart.length} Articulos
              </span>
              <span>subtotal</span>
              <span className='text-right'>$100</span>
              <span>Impuestos (15%)</span>
              <span className='text-right'>$15</span>
              <span className='text-2xl mt-5'>Total Price:</span>
              <span className='text-2xl mt-5 text-right'>
                ${productsIncart.reduce((acc, item) => acc + item.price, 0)}
              </span>
            </div>

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
