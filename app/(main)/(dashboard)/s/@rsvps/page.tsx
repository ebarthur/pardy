import { Boxes, Frown } from 'lucide-react';

export default function Rsvps() {
  return (
    <main className='flex h-1/2 items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Boxes size={32} className='stroke-gray-400 grayscale' />
        <div className='flex flex-col items-center'>
          <h1 className='font-mono text-xl font-semibold'>
            {' '}
            No reservations yet{' '}
            <Frown className='inline-flex stroke-gray-400' size={20} />
          </h1>
          <span className='text-xs text-gray-400'>
            Check out the latest events
          </span>
        </div>
      </div>
    </main>
  );
}
