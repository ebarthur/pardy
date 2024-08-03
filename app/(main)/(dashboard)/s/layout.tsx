'use client';
import Shell from '@/components/ui/shell';
import { usePathname } from 'next/navigation';

interface DashboardProps extends React.PropsWithChildren {
  rsvps: React.ReactNode;
  events: React.ReactNode;
}

const Dashboard = ({ children, rsvps, events }: DashboardProps) => {
  const path = usePathname();

  return (
    <Shell>
      {path === '/dashboard' ? (
        <div className='flex h-full w-full'>
          <div className='w-1/2 border-r border-default-50'>{rsvps}</div>
          <div className='flex w-1/2 flex-col'>
            <div className='h-1/2 w-full border-b border-default-50'>
              {events}
            </div>
            <div className='h-1/2 w-full'>{children}</div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Shell>
  );
};

export default Dashboard;
