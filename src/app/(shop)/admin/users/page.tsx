import {
  getPaginatedUsers,
} from '@/actions';
import { Title } from '@/components';

import { redirect } from 'next/navigation';
import { UserTable } from './ui/UserTable';

export default async function Orders() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }
  return (
    <>
      <Title title='Usuarios' />

      <div className='mb-10'>
        <UserTable users={users} />
      </div>
    </>
  );
}
