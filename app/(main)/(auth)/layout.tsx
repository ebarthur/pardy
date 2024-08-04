import { Container } from '@/components/ui/container';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen items-center'>
      <Container>{children}</Container>
    </div>
  );
}
