import { getEventsForDashboard } from '@/actions/events';
import { Event } from '@/types/event';
import { getCurrentUser } from '@/utils/authUser';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

const statusColors = {
  draft: 'warning',
  live: 'success',
  started: 'primary',
  ended: 'disabled',
  canceled: 'danger',
} as const;

const EventsRsvp = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <div>User not found</div>;
  }

  const events: Event[] = (await getEventsForDashboard(user.id)) || [];

  if (events.length === 0) {
    return <div>No events found</div>;
  }

  return (
    <div className='flex h-full w-full justify-center p-4'>
      <div className='w-full'>
        <h2 className='text-center font-mono text-xl'>{`Latest Events`}</h2>
        <div className='my-8 rounded-md border border-gray-200'>
          {events.map((event) => (
            <div
              key={event.id}
              className='flex gap-2 border-b border-gray-200 p-2'
            >
              <Link href={`/s/events/${event.id}`}>
                <span>{event.name}</span>
              </Link>
              <span>
                <Chip
                  size='sm'
                  color={
                    statusColors[event.status as keyof typeof statusColors]
                  }
                >
                  {event.status}
                </Chip>
              </span>
              <span>
                <Chip size='sm' variant='faded'>
                  {event.name}
                </Chip>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsRsvp;
