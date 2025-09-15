export const revalidate = 604800; //caching de 7 dias

import { titleFont } from '@/config/fonts';
import { notFound } from 'next/navigation';
import { SlideShow } from '@/components';
import { MobileSlideShow } from '@/components';
import { getProductBySlug } from '@/actions';
import { StockLabel } from '@/components';
import { Metadata, ResolvingMetadata } from 'next';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  // eslint-disable-next-line
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className='mt-5 mb-20 grid  grid-cols-1 md:grid-cols-3 gap-3'>
      {/* Slide show Images */}
      <div className='col-span-1 md:col-span-2'>
        <MobileSlideShow
          title={product.title}
          images={product.images}
          className='block md:hidden'
        />
        {/* Desktop Slideshow */}
        <SlideShow
          title={product.title}
          images={product.images}
          className='hidden md:block'
        />
      </div>
      {/* Product Details */}
      <div className='col-spa-1 px-5'>
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5'>${product.price}</p>

        <AddToCart product={product} />

        <h3 className='font-bold text-sm'>Descripcion</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  );
}
