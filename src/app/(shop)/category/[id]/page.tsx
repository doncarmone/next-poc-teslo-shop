import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

const SeedProducts = initialData.products;
interface Props {
  params: {
    id: Category;
  };
}

export default function ({ params }: Props) {
  const { id } = params;

  console.log('ID', id);
  const productos = SeedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: 'para Hombres',
    women: 'para Mujeres',
    kid: 'para Niños',
    unisex: 'para Todos',
  };

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title
        className='mb-2'
        title={`Articulos  ${labels[id]}`}
        subtitle='La mejor tienda de productos'
      />
      <ProductGrid products={productos} />
    </>
  );
}
