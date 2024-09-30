import { User } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import dayjs from "dayjs";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { EventModal } from "~/components/event-modal";
import { Input } from "~/components/input";
import { Modal } from "~/components/modal";
import { Select } from "~/components/select";
import { prisma } from "~/lib/prisma.server";
import { getUser, getUserId } from "~/lib/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = (await getUser(request)) as User;

  const today = dayjs().subtract(1, "day").toISOString();

  const events = await prisma.event.findMany({
    where: {
      date: { gte: today },
    },
    include: {
      organizer: true,
      category: true,
    },
  });
  const categories = await prisma.category.findMany();
  return json({ user, events, categories });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json(null, {
      status: 405,
      statusText: "Method Not Allow",
    });
  }

  const organizerId = (await getUserId(request)) as User["id"];
  const {
    title,
    description,
    location,
    date,
    categoryId: categoryIdString,
  } = await request.json();
  const categoryId = Number.parseInt(categoryIdString);
  const Idate = new Date(date).toISOString();

  await prisma.event.create({
    data: {
      organizerId,
      title,
      description,
      location,
      categoryId,
      date: Idate,
    },
  });

  return json({});
};

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard 🎉 Pardy" }];
};

export default function Events() {
  const { user, events, categories } = useLoaderData<typeof loader>() || {};
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const isOrganizer = user.role === "ORGANIZER";

  const handleCreateEventClick = () => setIsOpen(true);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="mx-auto h-full">
      {Boolean(isOrganizer) && (
        <div className="flex items-center justify-end">
          <Button onClick={handleCreateEventClick}>Add event</Button>
        </div>
      )}
      <EventModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        categories={categories}
      />
      {events.length === 0 && (
        <div className="p-4 h-1/2">
          <div className="text-secondary text-center flex flex-col items-center">
            <div className="i-lucide-calendar-cog size-36 mb-4" />
            <h2 className="text-lg">No upcoming events at the moment</h2>
            <p className="text-[.75rem] font-mono">
              Please check back <em className="text-amber-500">later</em> for
              updates.
            </p>
          </div>
        </div>
      )}
      <div>
        {/* add a filter here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {" "}
          {events.map((event) => (
            <Link
              to={`${event.id}`}
              key={event.id}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col max-w-sm"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 md:p-4 text-white">
                <h3 className="text-lg md:text-xl font-mono font-bold truncate">
                  <div>
                    {" "}
                    <div className="i-lucide-circle-check-big" />
                    {event.title}{" "}
                  </div>
                </h3>
                <p className="text-sm opacity-90 line-clamp-1">
                  {event.description}
                </p>
              </div>
              <div className="p-2 flex-grow">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <p className="w-4 h-4 mr-2 i-lucide-tags" />
                  <span className="font-medium font-mono">
                    {event.category.name}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <p className="w-4 h-4 mr-2 i-lucide-user" />
                  <span className="font-medium font-mono flex items-center gap-1">
                    {event.organizer.username}{" "}
                    <div className="inline-block i-lucide-verified text-green-500" />
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <p className="w-4 h-4 mr-2 i-lucide-map-pin" />
                  <span className="font-medium font-mono">
                    {event.location || "TBA"}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <p className="w-4 h-4 mr-2 i-lucide-calendar" />
                  <span className="font-medium font-mono">
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 font-mono py-2 text-xs text-gray-500 flex items-center">
                <p className="w-3 h-3 mr-1 i-lucide-clock-icon" />
                Posted: {new Date(event.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
