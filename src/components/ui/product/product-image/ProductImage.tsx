import Image from 'next/image';

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  width: number;
  height: number;
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style,
}: Props) => {
  const localSRC = src
    ? src?.includes('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg';

  return (
    <Image
      src={localSRC}
      width={width}
      height={height}
      alt={alt}
      className={`object-cover rounded ${className}`}
      style={style}
    />
  );
};
