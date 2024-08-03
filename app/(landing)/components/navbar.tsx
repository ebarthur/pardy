import Link from 'next/link';
import { GitHubIcon } from '@/components/icons/github';

export default function Navbar() {
  return (
    <nav className='z-10 w-full'>
      <div className='flex w-full items-center justify-between p-2'>
        <Link href={`/`} className='font-mono text-xl font-semibold'>
          Pardy
        </Link>
        {/* <Link href={`https://github.com/ebarthur`}>
          <GitHubIcon className='fill-gray-900 transition-colors duration-200 hover:fill-[#9333EA]' />
        </Link> */}
        <div>
          <img src='./github.svg' alt='github.com' className='h-8 w-8' />
        </div>
      </div>
    </nav>
  );
}
