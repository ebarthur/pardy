import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, redirect } from "@remix-run/react";
import { getUser } from "~/lib/session.server";
import { json } from "@remix-run/node";
import { Layout } from "~/components/layout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    await getUser(request);
    return redirect("/s");
  } catch (_error) {
    //
  }

  return json({});
};

export const meta: MetaFunction = () => {
  return [
    { title: "The Pardy App" },
    { name: "description", content: "Reimagining urban events 🎉" },
  ];
};

export default function Home() {
  return (
    <main className="">
      <Layout className="h-auto !max-w-5xl">
        <div className="container py-5 pb-0">
          <h1 className="mx-auto mt-8 text-center font-semibold text-secondary">
            Welcome to Pardy{" "}
            <span className="inline-block">
              <div className="i-lucide-party-popper" />
            </span>
          </h1>
          <div className="mx-auto text-center lg:w-2/3">
            <h1 className="text-5xl font-bold text-secondary md:text-6xl xl:text-7xl">
              Reimagining <span className="text-purple">urban events.</span>
            </h1>
            <p className="mt-8 font-mono text-sm text-secondary">
              From local meetups to big festivals, stay connected with the best
              happenings in your city and enhance your event experience.
            </p>
            <div className="mx-auto mt-8 text-center">
              <div className="flex justify-center">
                <Link
                  prefetch="intent"
                  to="login"
                  className="flex items-center rounded-full hover:scale-105 transition duration-300 px-6 h-11 bg-purple sm:w-max"
                >
                  <span className="text-base font-semibold text-white">
                    Get started
                  </span>
                </Link>
              </div>
            </div>
            <div className="my-8 grid place-content-center">
              <img
                src="./dashboard.png"
                alt="Dashboard"
                width={600}
                height={600}
              />
            </div>
            <div className="font-roboto text-3xl font-bold text-gray-500">
              "Redefining the future of events..."
            </div>
          </div>
        </div>
      </Layout>
    </main>
  );
}
