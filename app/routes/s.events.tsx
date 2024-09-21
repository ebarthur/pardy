import { User } from "@prisma/client";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Modal } from "~/components/modal";
import { Select } from "~/components/select";
import { prisma } from "~/lib/prisma.server";
import { getUser, getUserId } from "~/lib/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = (await getUser(request)) as User;

  const events = await prisma.event.findMany({
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
  const { user, events, categories } = useLoaderData<typeof loader>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const submit = useSubmit();
  const navigation = useNavigation();

  async function createEvent(data: FieldValues) {
    submit(JSON.stringify(data), {
      method: "POST",
      encType: "application/json",
    });
  }

  const isOrganizer = user.role === "ORGANIZER";

  const handleCreateEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const handleCloseModal = () => setIsOpen(false);

  return (
    <div className="mx-auto h-full">
      {Boolean(isOrganizer) && (
        <div className="flex items-center justify-end">
          <Button onClick={handleCreateEventClick}>Add event</Button>
        </div>
      )}

      <Modal open={isOpen} onClose={handleCloseModal} className="w-96">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Add New Event</h2>
          <form
            onSubmit={handleSubmit(createEvent)}
            className="flex flex-col space-y-4"
          >
            <Input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="border p-2 rounded-md"
            />
            <Input
              placeholder="Description"
              {...register("description", { required: true, maxLength: 255 })}
              className="border p-2 rounded-md"
            />
            <Input
              placeholder="Location"
              {...register("location", { maxLength: 25 })}
              className="border p-2 rounded-md"
            />

            <div className="flex gap-2">
              <Input
                required
                {...register("date", { required: true })}
                defaultValue={new Date().toISOString().split("T")[0]} // default to today
                min={new Date().toISOString().split("T")[0]}
                type="date"
                className="border p-2 rounded-md"
              />
              <Select {...register("categoryId")}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={navigation.state === "submitting"}
                type="submit"
              >
                {navigation.state === "submitting"
                  ? "Creating..."
                  : "Create Event"}
              </Button>
              <Button variant="neutral" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
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
      {events.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {events.map((event) => (
            <Link
              to={`${event.id}`}
              key={event.id}
              className="bg-white shadow-md p-4 rounded-md"
            >
              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
              <p className="text-sm mb-4">{event.description}</p>
              <p className="text-sm font-light">
                Category: {event.category.name} | Organizer:{" "}
                {event.organizer.username}
              </p>
              <p className="text-sm font-light">
                Location: {event.location ? event.location : "TBA"}
              </p>
              <p className="text-sm font-light">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Created at: {new Date(event.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
