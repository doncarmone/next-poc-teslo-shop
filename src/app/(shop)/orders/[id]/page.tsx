import Link from 'next/link';
import Image from 'next/image';
import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import { QuantitySelector } from '@/components';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

const productsIncart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: { id: string };
}

export default function AdminPage({ params }: Props) {
  const { id } = params;
  //Todo Verificar que la orden exista

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden #${id}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart items will be displayed here */}
          <div className='flex flex-col mt-5'>
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': true,
                  'bg-green-700': false,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className='mx-2'>Pendiente de pago</span>
            </div>

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
                  <p>Subtotal ${product.price}</p>
                  <button className='underline mt-3'>Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Example cart item */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl font-bold mb-2'>Direccion de entrega</h2>
            <div className='mb-10'>
              <p className='font-bold'>Tester</p>
              <p>Avenida siempre viva123</p>
              <p>Col. Centro</p>
              <p>Alcaldia Miguel Juarez</p>
              <p>Ciudad de mexico</p>
              <p>+52 1234567890</p>
            </div>

            {/* divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl font-bold mb-2'>Resumen de orden</h2>
            <div className='grid grid-cols-2'>
              <span>No. Articulos:</span>
              <span className='text-right'>
                {productsIncart.length} Articulos
              </span>
              <span>Subtotal</span>
              <span className='text-right'>$100 x 3</span>
              <span>Impuestos (15%)</span>
              <span className='text-right'>$15</span>
              <span className='text-2xl mt-5'>Total Price:</span>
              <span className='text-2xl mt-5 text-right'>
                ${productsIncart.reduce((acc, item) => acc + item.price, 0)}
              </span>
            </div>

            <div>
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mt-5',
                  {
                    'bg-red-500': true,
                    'bg-green-700': false,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className='mx-2'>Pendiente de pago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
