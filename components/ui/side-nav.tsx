"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";
// import { signout } from "@/actions/signout";

const links = [
  { route: "/s", name: "Home" },
  { route: "/s/events", name: "Events" },
  { route: "/s/guests", name: "Guests" },
  { route: "/s/activity", name: "Activity" },
  { route: "/s/settings", name: "Settings" },
];

const isActive = (path: string, route: string) => {
  if (route === "/s") {
    return path === "/s";
  } else {
    return path.includes(route);
  }
};
const Side = () => {
  const path = usePathname();
  const activeClass = "bg-primary hover:bg-primary";

  return (
    <div className="w-full h-full px-3 relative">
      <div className="mb-12">
        <h1 className="font-mono font-semibold text-2xl">Pardy</h1>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route}>
              <div
                className={`w-full h-full py-2 px-2 hover:bg-content1 rounded-lg ${
                  isActive(path, link.route) ? activeClass : ""
                }`}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 w-full left-0 px-4">
        <Button href="/" fullWidth variant="ghost">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Side;
