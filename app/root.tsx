import React from "react";
import "@unocss/reset/tailwind-compat.css";
import "virtual:uno.css";
import "./styles.css";

import { User } from "@prisma/client";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { PendingUI } from "./components/pending-ui";
import { getUser } from "./lib/session.server";
export const loader = async ({ request }: LoaderFunctionArgs) => {
  let user: User | undefined | null;

  try {
    user = await getUser(request);
  } catch (_error) {
    //
  }

  return json({ user });
};
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PendingUI />
        <Navbar />
        {children}
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
