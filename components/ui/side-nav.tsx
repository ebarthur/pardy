'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { SignOut } from '@/actions/signout.actions';
import {
  Cog,
  Combine,
  Handshake,
  Home,
  MonitorDot,
  MoveLeft,
  UsersRound,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const links = [
  { route: '/s', name: 'Home', icon: <Home /> },
  { route: '/s/events', name: 'Events', icon: <Combine /> },
  { route: '/s/guests', name: 'Guests', icon: <UsersRound /> },
  { route: '/s/activity', name: 'Activity', icon: <MonitorDot /> },
  { route: '/s/settings', name: 'Settings', icon: <Cog /> },
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
  const activeClass = '!bg-[#AA55F7] text-white';

  return (
    <div className='relative h-full w-full px-3'>
      <div className='mb-6 flex items-center px-2'>
        <h1 className='mt-6 flex items-center gap-2 font-mono text-2xl font-semibold'>
          <Handshake className='stroke-[#AA55F7]' />
          Pardy
        </h1>
      </div>
      <div>
        {links.map((link) => (
          <div className='w-full' key={link.route}>
            <Link href={link.route}>
              <div
                className={`flex h-full w-full gap-2 rounded-lg px-2 py-2 font-mono hover:bg-gray-200 ${
                  isActive(path, link.route) ? activeClass : ''
                }`}
              >
                {link.icon} {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className='absolute bottom-10 left-0 w-full px-4 font-mono'>
        <AlertDialog>
          <Button fullWidth variant='ghost'>
            <MoveLeft />
            <AlertDialogTrigger>Sign Out</AlertDialogTrigger>
          </Button>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Whoa, leaving already? The night's still young!
              </AlertDialogTitle>
              <AlertDialogDescription>
                Come on, the party's just getting started! Stick around for one
                more drink?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => SignOut()}
                className='bg-[#AA55F7] hover:bg-[#AA55F7]/70'
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Side;
