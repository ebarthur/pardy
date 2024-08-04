import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextUIProvider from './NextUIProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pardy | The Event App',
  description: 'Reserve your spot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} bg-transparent`}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
