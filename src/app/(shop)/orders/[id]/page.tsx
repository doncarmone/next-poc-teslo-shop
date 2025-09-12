import { Title } from '@/components';

import { getOrderById } from '@/actions';
import { PlacedOrder } from './ui/PlacedOrder';
import { redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function AdminPage({ params }: Props) {
  const { id } = params;

  const result = await getOrderById(id);
  if (!result?.ok) {
    redirect('/');
  }

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Orden`} />
        <h2 className='text-lg font-bold'>{`#${id}`}</h2>
        <PlacedOrder order={result.order!} />
      </div>
    </div>
  );
}
