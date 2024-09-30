import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";
import { getUserId } from "~/lib/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const userId = await getUserId(request);

	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
		include: {
			tickets: true,
		},
	});
	return json({ user });
};

export const meta: MetaFunction = () => {
	return [{ title: "Dashboard 🎉 Pardy" }];
};

export default function Events() {
	const { user } = useLoaderData<typeof loader>();

	const zeroTicket = user?.tickets.length === 0;

	return (
		<div className="mx-auto p-6">
			{Boolean(zeroTicket) && (
				<div>
					<div className="p-4 h-1/2">
						<div className="text-secondary text-center flex flex-col items-center p-2">
							<div className="i-lucide-wallet-minimal size-36 mb-4" />
							{/* <p className="text-xl">🎟️ No tickets? Get yours now!</p> */}
							<h2 className="text-lg">
								It looks like you don't have any tickets yet!
							</h2>
							<p className="font-mono text-[.75rem]">
								🎟️ No tickets? Get yours{" "}
								<Link to="/s/events" className="underline text-amber-500">
									now!
								</Link>
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
