'use client';
import { getCurrentUser } from '@/utils/authUser';
import { Input } from '@nextui-org/react';
// import { createNewEvent } from '@/actions/events'
import { Button, Tooltip } from '@nextui-org/react';
import { CirclePlus } from 'lucide-react';
import { useTransition } from 'react';

const Nav = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      // createNewEvent()
    });
  };

  return (
    <nav className='flex h-[65px] items-center gap-4 border-b border-gray-200 px-6'>
      <div>
        <Tooltip content='New Event'>
          <Button
            isIconOnly
            variant='ghost'
            size='sm'
            isLoading={isPending}
            onClick={handleClick}
          >
            <CirclePlus size={16} />
          </Button>
        </Tooltip>
      </div>
      <div className='w-3/4'>
        <Input size='sm' variant='faded' placeholder='search' />
      </div>
      {/* Replace with user component  */}
      <div className='ml-20 font-mono text-sm'>UserComponent</div>
    </nav>
  );
};

export default Nav;
