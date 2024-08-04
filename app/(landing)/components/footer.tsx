import Link from 'next/link';

export default function Footer() {
  return (
    <div className='container z-20 my-10 h-auto w-screen border-t border-gray-300 pt-4'>
      <div className='flex items-center justify-between px-2 md:px-6'>
        <div className='font-mono text-xs md:text-sm'>
          Built by{' '}
          <span className='underline underline-offset-1'>
            <Link href={'https://github.com/ebarthur'}>statman</Link>
          </span>
        </div>
        <div className='font-mono text-xs md:text-sm'>
          Copyright &copy; 2024
        </div>
      </div>
    </div>
  );
}
