import { useLoaderData, useNavigate, useFetcher } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import React from "react";
import { prisma } from "~/lib/prisma.server";
import { Layout } from "~/components/layout";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const email = searchParams.get("email");
  const remember = searchParams.get("remember");
  invariant(email, "Email must be provided in the URL");
  // invariant(remember, "remember must be provided in the URL");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const verified = user?.verified === true;

  return json({
    email,
    verified: verified,
    remember,
  });
};

export const meta: MetaFunction = () => {
  return [{ title: "Account Created 🎉 Pardy" }];
};

export default function AccountCreated() {
  const { email, verified, remember } = useLoaderData<typeof loader>();
  const [isVerified, setIsVerified] = React.useState<boolean>(verified);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      fetcher.load(`/account-created?email=${email}`);
    }, 5000);

    if (fetcher.data && (fetcher.data as { verified: boolean }).verified) {
      setIsVerified(true);
      clearInterval(intervalId);
      navigate(`/verified-login?email=${email}&remember=${remember}`);
    }

    return () => clearInterval(intervalId);
  }, [fetcher, navigate, email]);

  if (isVerified) {
    return (
      <Layout className="min-h-[60vh] max-w-xl flex items-center">
        <div className="flex items-center gap-4">
          <span className="i-lucide-shield-check md:text-9xl text-green-500 hidden md:block" />
          <div>
            <div className="text-sm">
              <div className="text-xl md:text-3xl font-semibold my-2 md:my-4">
                {" "}
                Verified
              </div>
              Your email has been verified!{" "}
              <div className="rounded-lg p-2 bg-blue-50 text-green-500 my-2 dark:bg-green-700 dark:bg-opacity-10 dark:text-green-400 w-fit flex items-center gap-2 text-[.75rem]">
                <i className="i-lucide-handshake inline-block" /> Redirecting...
                <div className="i-svg-spinners-270-ring inline-block" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="min-h-[60vh] max-w-xl flex items-center">
      <div className="flex items-center gap-4">
        <span className="i-lucide-shield-ellipsis md:text-9xl text-secondary hidden md:block" />
        <div>
          <div className="text-sm">
            <div className="text-xl md:text-3xl font-semibold my-2 md:my-4">
              {" "}
              Verify your account
            </div>
            We have sent an email to{" "}
            <span className="underline underline-offset-2 font-semibold text-amber-500">
              {email}
            </span>
            . Kindly check your inbox.
            <div className="rounded-lg p-2 bg-blue-50 text-blue-500 my-2 dark:bg-blue-700 dark:bg-opacity-10 dark:text-blue-400 w-fit flex items-center gap-2 text-[.75rem]">
              <i className="i-lucide-handshake inline-block" /> Checking to see
              if your account has been verified{" "}
              <div className="i-svg-spinners-270-ring inline-block" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
