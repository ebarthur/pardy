import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { Button } from "~/components/button";
import { prisma } from "~/lib/prisma.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.eventId, "eventId should be in URL");

  const event = await prisma.event.findUnique({
    where: {
      id: Number.parseInt(params.eventId),
    },
  });
  return json({ event });
};

// []: work on this page. users should be able to buy tickets here
export default function Event() {
  const { event } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className="p-6 mx-auto">
      <Button
        className="flex items-center justify-start"
        onClick={handleGoBack}
      >
        <div className="i-lucide-circle-arrow-left" />
      </Button>
      <div>{event?.id}</div>
    </main>
  );
}
