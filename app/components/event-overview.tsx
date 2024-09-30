import type { Event as PrismaEvent } from "@prisma/client";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { Jsonify } from "type-fest";

interface Event extends PrismaEvent {
	category: {
		name: string;
	};
}

interface EventOverviewProps {
	events: Event[] | Jsonify<Event[]>;
}

enum Category {
	Music = "Music",
	Online = "Online",
	Technology = "Technology",
	Art = "Art",
	Other = "Other",
}

const categoryColor: Record<string, string> = {
	[Category.Music]: "bg-blue-500 text-white",
	[Category.Online]: "bg-green-500 text-white",
	[Category.Technology]: "bg-red-500 text-white",
	[Category.Art]: "bg-orange-500 text-white",
	[Category.Other]: "bg-gray-500 text-white",
	// Add more categories and their corresponding colors here
};

export function EventOverview({ events }: EventOverviewProps) {
	return (
		<div className="mx-auto">
			<div className="flex justify-center w-full">
				<div className="w-full">
					<h2 className="font-mono text-lg flex justify-center items-center gap-2">
						Latest Events{" "}
						<div className="i-lucide-calendar-fold text-amber-500" />
					</h2>
					<div className="my-4 rounded-md border-b dark:border-neutral-700">
						{events.slice(0, 5).map((event) => (
							<Link to={`/s/events/${event.id}`}>
								<div
									key={event.id}
									className="flex items-center hover:bg-zinc-100 dark:hover:bg-neutral-800 gap-2 border-b dark:border-neutral-700 p-2"
								>
									<span className="text-sm">{event.title}</span>

									<div
										className={clsx(
											"rounded-full px-2 py-1 text-[.75rem]",
											categoryColor[event.category.name],
										)}
									>
										{event.category.name}
									</div>
									<div className="rounded-full px-2 py-.5 text-[.75rem] bg-neutral-100 dark:bg-gray-900 border-2 border-gray-200 dark:border-neutral-800 hover:bg-transparent">
										{event.location}
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
