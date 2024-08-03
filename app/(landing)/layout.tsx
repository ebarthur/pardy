import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Container } from '@/components/container';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pardy | The Event App',
  description: 'Reserve your spot',
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-transparent`}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
