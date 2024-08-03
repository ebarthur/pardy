'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { SignOut } from '@/actions/signout.actions';

const links = [
  { route: '/s', name: 'Home' },
  { route: '/s/events', name: 'Events' },
  { route: '/s/guests', name: 'Guests' },
  { route: '/s/activity', name: 'Activity' },
  { route: '/s/settings', name: 'Settings' },
];

const isActive = (path: string, route: string) => {
  if (route === '/s') {
    return path === '/s';
  } else {
    return path.includes(route);
  }
};
const Side = () => {
  const path = usePathname();
  const activeClass = '!bg-[#9333EA] text-white';

  return (
    <div className='relative h-full w-full px-3'>
      <div className='mb-12'>
        <h1 className='font-mono text-2xl font-semibold'>Pardy</h1>
      </div>
      <div>
        {links.map((link) => (
          <div className='w-full' key={link.route}>
            <Link href={link.route}>
              <div
                className={`h-full w-full rounded-lg px-2 py-2 font-mono hover:bg-gray-200 ${
                  isActive(path, link.route) ? activeClass : ''
                }`}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className='absolute bottom-10 left-0 w-full px-4 font-mono'>
        <Button href='/' onClick={() => SignOut()} fullWidth variant='ghost'>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Side;
