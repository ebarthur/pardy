import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Container } from '@/components/ui/container';
import Navbar from './components/navbar';
import Footer from './components/footer';

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
        <Container>
          <Navbar />
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
