export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-auto max-w-4xl px-6 md:px-12 xl:px-6'>{children}</div>
  );
}
