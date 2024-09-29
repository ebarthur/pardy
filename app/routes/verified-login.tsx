import { LoaderFunctionArgs, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { prisma } from "~/lib/prisma.server";
import { createUserSession } from "~/lib/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const searchParams = new URL(request.url).searchParams;

	const email = searchParams.get("email");
	invariant(email, "Email should be in request params");
	const remember = searchParams.get("remember") as unknown as boolean;

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (!user) {
		return json(null, {
			status: 401,
			statusText: "unauthenticated",
		});
	}

	return createUserSession({
		request,
		userId: user.id,
		remember,
		redirectTo: "/s",
	});
};
