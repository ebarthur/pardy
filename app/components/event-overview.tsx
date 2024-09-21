import type { Event } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Jsonify } from "type-fest";

interface EventOverviewProps {
  events: Event[] | Jsonify<Event[]>;
}

export function EventOverview({ events }: EventOverviewProps) {
  return (
    <div className="mx-auto p-2">
      <div className="flex justify-center w-full">
        <div className="w-full">
          <h2 className="font-mono text-lg flex justify-center items-center gap-2">
            Latest Events{" "}
            <div className="i-lucide-calendar-fold text-amber-500" />
          </h2>
          <div className="my-4 rounded-md border-b dark:border-neutral-700">
            {events.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex gap-2 border-b dark:border-neutral-700 p-2"
              >
                <Link to={`/s/events/${event.id}`}>
                  <span>{event.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
