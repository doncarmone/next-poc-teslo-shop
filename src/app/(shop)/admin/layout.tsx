import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role !== 'admin') {
    return redirect('/auth/login');
  }
  return <>{children}</>;
}
