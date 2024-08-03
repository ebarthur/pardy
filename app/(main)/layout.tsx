import { Container } from '@/components/container';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='h-screen w-screen p-8'>{children}</div>;
}
