import Link from 'next/link';
import Image from 'next/image';
import { Title } from '../../../components/ui/title/Title';
import { initialData } from '@/seed/seed';
import { QuantitySelector } from '@/components';

const productsIncart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
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
              <p className='text-sm text-gray-500 mt-5'>
                disclaimer: al dar click en colocar orden se genera una orden de
                manera automatica sin pasar por ningun proceso de pago
              </p>
              <Link
                href='/orders/123'
                className='flex btn btn-primary mt-5 w-full justify-center'
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
