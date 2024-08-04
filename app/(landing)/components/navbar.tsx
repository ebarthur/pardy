import Link from 'next/link';
import { Handshake } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className='z-10 w-full'>
      <div className='mt-4 flex w-full items-center justify-between p-2'>
        <Link href={`/`} className='font-mono text-xl font-semibold'>
          <h1 className='flex items-center gap-2 font-mono text-2xl font-semibold'>
            <Handshake className='stroke-[#AA55F7]' />
            Pardy
          </h1>
        </Link>
        <div>
          <img src='./github.svg' alt='github.com' className='h-8 w-8' />
        </div>
      </div>
    </nav>
  );
}
