export const revalidate = 60;

import { redirect } from 'next/navigation';

import { Title, Pagination, ProductGrid } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';

interface Props {
  searchParams: { page?: string };
}

export default async function Home({ searchParams }: Props) {
  // const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { page } = await searchParams;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page ? parseInt(page) : 1,
  });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title='Tienda'
        subtitle='La mejor tienda de productos'
        className='mb-2'
      />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
