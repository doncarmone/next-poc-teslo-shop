import type { Metadata } from 'next';
import { inter } from '@/config/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Teslo Shop',
  description: 'Tienda virtual de productos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
