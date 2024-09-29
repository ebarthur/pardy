import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

const links = [
	{ route: "/s", name: "Home", icon: "i-lucide-home" },
	{ route: "events", name: "Events", icon: "i-lucide-combine" },
	{ route: "tickets", name: "Tickets", icon: "i-lucide-ticket" },
	{ route: "activity", name: "Activity", icon: "i-lucide-monitor-dot" },
	{ route: "settings", name: "Settings", icon: "i-lucide-cog" },
];

const isActive = (path: string, route: string) => {
	if (route === "/s") {
		return path === "/s";
	} else {
		return path.includes(route);
	}
};

const Side = () => {
	const location = useLocation();
	const path = location.pathname;
	const activeClass =
		"!bg-zinc-200 !dark:bg-neutral-700 text-dark dark:text-white";

	return (
		<div className="relative h-full w-full px-3">
			<div className="mt-4">
				{links.map((link) => (
					<div
						className={`w-full rounded-lg p-2 my-1 font-mono hover:bg-zinc-100 dark:hover:bg-neutral-800 ${
							isActive(path, link.route) ? activeClass : ""
						}`}
						key={link.route}
					>
						<Link to={link.route} className="flex items-center gap-2">
							<div className={clsx("text-sm", link.icon)}></div>
							<div>{link.name}</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Side;
