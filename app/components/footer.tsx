import { Link, useLocation } from "@remix-run/react";
import { DASHBOARD_REGEX } from "~/lib/DASHBOARD-REGEX";

export default function Footer() {
	const location = useLocation();

	if (DASHBOARD_REGEX.test(location.pathname)) {
		return null;
	}

	return (
		<div>
			<div className="p-6 dark:bg-neutral-800 bg-neutral-100 max-w-7xl mx-auto md:rounded-xl md:mt-12 mt-8">
				<div className="h-auto">
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="i-lucide-handshake size-8 md:text-4xl" />
							<h2 className="font-bold text-2xl md:text-3xl tracking-wide">
								Pardy
							</h2>
						</div>
						<div className="mt-4 md:mt-0">
							<p className="dark:text-white/70">
								Your event hub for memorable experiences.
							</p>
						</div>
					</div>
					<div className="mt-8 grid grid-cols-2 gap-4 text-sm">
						<div>
							<h3 className="font-semibold dark:text-white">Project</h3>
							<ul className="mt-2 space-y-2 dark:text-white/70">
								<li>
									<Link
										to="https://github.com/ebarthur/pardy/issues/new"
										className="hover:text-blue-400"
									>
										Report an issue
									</Link>
								</li>
								<li>
									<Link
										to="https://github.com/ebarthur/pardy"
										className="hover:text-blue-400"
									>
										Contribute
									</Link>
								</li>
								<li>
									<Link to="/" className="hover:text-blue-400">
										Blog
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<ul className=" my-2 dark:text-white/70 flex items-center gap-2">
								<div className="rounded-full bg-green-500 h-2 w-2" />
								<li className="text-sm">All systems green</li>
							</ul>
							<ul>
								<li className="rounded-xl bg-neutral-200 hover:bg-neutral-300 transition hover:scale-105 duration-300 dark:hover:bg-neutral-600 dark:bg-neutral-700 px-2 py-1 w-fit">
									<Link
										to="https://github.com/ebarthur/pardy"
										className="flex gap-2 items-center text-sm"
									>
										<div className="i-lucide-github" />
										Source code
									</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Bottom section: Footer copyright */}
					<div className="mt-8 border-t dark:border-white/10 pt-4 text-xs text-center dark:text-white/50">
						<p>&copy; {new Date().getFullYear()} Pardy. All Rights Reserved.</p>
					</div>
				</div>
			</div>
		</div>
	);
}
