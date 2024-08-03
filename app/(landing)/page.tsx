import Navbar from './components/navbar';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

export default function Home() {
  return (
    <div className='relative w-full'>
      <Navbar />
      <div className='container py-5 pb-0'>
        <h1 className='mx-auto mt-8 text-center font-semibold text-gray-600'>
          Welcome to Pardy{' '}
          <span className='inline-block'>
            <PartyPopper size={16} />
          </span>
        </h1>
        <div className='mx-auto text-center lg:w-2/3'>
          <h1 className='text-5xl font-bold text-gray-900 dark:text-white md:text-6xl xl:text-7xl'>
            Reimagining{' '}
            <span className='prime dark:text-white'>urban events.</span>
          </h1>
          <p className='mt-8 font-mono text-sm text-gray-700 dark:text-gray-300'>
            From local meetups to big festivals, stay connected with the best
            happenings in your city and enhance your event experience.
          </p>
          <div className='mx-auto mt-8 text-center'>
            <div className='flex flex-wrap justify-center gap-x-6 gap-y-4'>
              <Link
                href='/sign-in'
                className='relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-[#9333EA] before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max'
              >
                <span className='relative text-base font-semibold text-white'>
                  Get started
                </span>
              </Link>
              <Link
                href='/'
                className='relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max'
              >
                <span className='relative text-base font-semibold text-[#9333EA] dark:text-white'>
                  Learn more
                </span>
              </Link>
            </div>
          </div>
          <div className='mt-8 flex items-center gap-2'></div>
        </div>
      </div>
    </div>
  );
}
