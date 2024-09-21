import {
  ActionFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";
import { Layout } from "~/components/layout";
import { Button } from "~/components/button";
import { Link } from "@remix-run/react";

export const loader = async ({ request }: ActionFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (!email || !token) {
    return new Response(null, { status: 400 });
  }

  const verificationRequest = await prisma.emailVerificationRequest.findFirst({
    where: { email, token },
  });

  if (!verificationRequest) {
    return new Response(null, { status: 400 });
  }

  await prisma.user.update({
    where: { email },
    data: { verified: true },
  });

  return json({});
};

export const meta: MetaFunction = () => {
  return [{ title: "Verify Account 🎉 Pardy" }];
};

export default function VerifyEmail() {
  return (
    <Layout className="min-h-[60vh] flex items-center max-w-xl">
      <div className="flex items-center gap-4">
        <span className="i-lucide-badge-check md:text-9xl text-green-500 hidden md:block" />
        <div>
          <div className="text-sm">
            <div className="text-xl flex items-center gap-2 md:text-3xl font-semibold my-2 md:my-4">
              {" "}
              Verified{" "}
              <span className="i-lucide-badge-check text-green-500 md:hidden" />
            </div>
            Thank you for verifying your account with us! You'll be auto-logged
            in on your other device
            <div className="my-2 flex items-center gap-1 font-bold">
              Or you can choose to log in here{" "}
              <div className="i-lucide-chevrons-down" />
            </div>
            <div className="mt-4">
              <Link to="/login">
                <Button>Log in</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
