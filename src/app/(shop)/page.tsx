import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import { ProductGrid } from '../../components/products/product-grid/ProductGrid';

const productos = initialData.products;

export default function Home() {
  return (
    <>
      <Title
        title='Tienda'
        subtitle='La mejor tienda de productos'
        className='mb-2'
      />

      <ProductGrid products={productos} />
    </>
  );
}
