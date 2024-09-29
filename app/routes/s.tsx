import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import invariant from "tiny-invariant";
import Attendees from "~/components/attendees";
import { EventOverview } from "~/components/event-overview";
import { Layout } from "~/components/layout";
import Shell from "~/components/shell";
import { prisma } from "~/lib/prisma.server";
import { getUserId } from "~/lib/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	await getUserId(request); // [] Remind me to do something here

	const events = await prisma.event.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
	invariant(events);

	return json({ events });

	//[] events that the current user is going
};

export default function Dashboard() {
	const { events } = useLoaderData<typeof loader>();
	const location = useLocation();
	return (
		<Layout>
			<div className="min-h-[90vh]">
				<Shell>
					{location.pathname === "/s" ? (
						<div className="flex h-full w-full">
							<div className="w-1/2 border-r border-default-50 dark:border-neutral-700">
								rsvps
							</div>
							<div className="flex w-1/2 flex-col">
								<div className="h-1/2 w-full border-b px-4 border-default-50 dark:border-neutral-700">
									<EventOverview events={events} />
								</div>
								<div className="h-1/2 w-full px-4">
									<Attendees />
								</div>
							</div>
						</div>
					) : (
						<Outlet />
					)}
				</Shell>
			</div>
		</Layout>
	);
}
