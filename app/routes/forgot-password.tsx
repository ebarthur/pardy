import { ActionFunctionArgs, json, MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { send } from "~/lib/mail.server";
import { prisma } from "~/lib/prisma.server";
import { randomStr } from "~/lib/random-str";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  const { email } = await request.json();

  // [ ]: Throttle this request. Users should not spam this endpoint.

  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    return json({});
  }

  // Don't resend token if user has a valid token
  const hourAgo = dayjs().subtract(1, "hour").toDate();

  const validToken = await prisma.passwordResetRequest.findFirst({
    where: { userId: user.id, used: false, createdAt: { gte: hourAgo } },
  });

  if (validToken) {
    return json({});
  }

  const resetRequest = await prisma.passwordResetRequest.create({
    data: {
      userId: user.id,
      token: randomStr(24),
    },
  });

  const domain = process.env.DOMAIN;

  const link = [
    `https://${domain}/reset-password?`,
    `email=${email}`,
    `&token=${resetRequest.token}`,
  ].join("");

  await send({
    to: user.email,
    from: "pardy@ebartur.com",
    subject: `Reset Password: ${user.username}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hi 👋🏽,</p>
        <p>You requested to change your password. Click the link below to continue:</p>
        <p><a href="${link}" style="color: #1a73e8;">Reset Password</a></p>
        <p>All the best!</p>
      </div>
    `,
  });

  return json({});
};

export const meta: MetaFunction = () => {
  return [{ title: "Forgot Password 🎉 Pardy" }];
};

export default function ForgotPassword() {
  const { handleSubmit, register } = useForm();
  const fetcher = useFetcher();

  async function sendRequest(data: FieldValues) {
    fetcher.submit(JSON.stringify(data), {
      encType: "application/json",
      method: "POST",
    });
  }

  return (
    <div className="container mx-auto">
      <div className="min-h-[60vh]">
        <div className="lg:max-w-[24rem] mx-auto">
          <form
            className="bg-white dark:bg-neutral-900 rounded-lg border dark:border-neutral-800 p-4"
            onSubmit={handleSubmit(sendRequest)}
          >
            <h1 className="font-bold text-2xl mb-2">
              Forgot <br />
              Password
            </h1>

            {fetcher.data ? (
              <>
                <div className="mt-2">
                  Reset link has been sent to your email.
                </div>
              </>
            ) : (
              <>
                <label className="block mt-2">
                  Email
                  <Input {...register("email", { required: true })} />
                  <small className="text-secondary">
                    A reset link will be sent to this address if it's valid.
                  </small>
                </label>

                <div className="mt-2">
                  <Button disabled={fetcher.state === "submitting"}>
                    {fetcher.state === "submitting" ? "Sending..." : "Send"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
