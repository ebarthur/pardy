import { json, LoaderFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Input } from "~/components/input";
import { FieldValues, useForm } from "react-hook-form";
import { ActionFunctionArgs } from "@remix-run/node";
import { Link, useActionData, useFetcher, useSubmit } from "@remix-run/react";
import { Button } from "~/components/button";
import React from "react";
import { USERNAME_REGEX } from "~/lib/username-regex";
import { Prisma, type User } from "@prisma/client";
import { prisma } from "~/lib/prisma.server";
import { hash } from "~/lib/password.server";
import { sendEmailVerification } from "~/lib/send-email-verification";
import { Layout } from "~/components/layout";
import { restrictedUsernames } from "~/lib/restricted-usernames";
import { getUser } from "~/lib/session.server";

export const loader = async({request}: LoaderFunctionArgs)=> {
  try {
    await getUser(request)
    return redirect("/s")
  } catch (_error) {
    //
  }
  return json({})
}

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") return new Response(null, { status: 405 });

  const { email, username, password, remember } = await request.json();

  for (const restrictedUsername of restrictedUsernames) {
    if (username === restrictedUsername) {
      return json(
        {
          type: "conflict",
          field: "username",
          message: "username already exists",
        },
        { status: 403 }
      );
    }
  }

  let user: User;
  try {
    user = await prisma.user.create({
      data: {
        email,
        username,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const [field] = error.meta?.target as string[];
      return json(
        { type: "conflict", field, message: `${field} already exists` },
        { status: 403 }
      );
    }

    return json(
      { type: "unknown-error", message: "something went wrong" },
      { status: 500 }
    );
  }

  await prisma.authCredential.create({
    data: {
      password: await hash(password),
      userId: user.id,
    },
  });

  await sendEmailVerification(email);

  return redirect(`/account-created?email=${user.email}&remember=${remember}`);
};

export const meta: MetaFunction = () => {
  return [{ title: "Create Account 🎉 Pardy" }];
};

export default function CreateAccount() {
  const { formState, getFieldState, handleSubmit, register, setError } =
    useForm();
  const fetcher = useFetcher();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  function createAccount(data: FieldValues) {
    submit(JSON.stringify(data), {
      method: "POST",
      encType: "application/json",
    });
  }

  const emailState = getFieldState("email", formState);
  const usernameState = getFieldState("username", formState);

  React.useEffect(() => {
    if (!actionData) {
      return;
    }

    if (actionData.type === "conflict") {
      setError(actionData.field, { message: actionData.message });
    }
  }, [actionData, setError]);
  return (
    <Layout>
      <div className="min-h-[60vh]">
        <div className="lg-max-w-[24rem] mx-auto">
          <form
            className="bg-white dark:bg-neutral-900 rounded-lg border dark:border-neutral-800 p-4 mt-12"
            onSubmit={handleSubmit(createAccount)}
          >
            <h1 className="font-bold text-xl mb-2">Create Account</h1>
            <div className="rounded-lg p-2 bg-blue-50 text-blue-500 my-2 dark:bg-blue-700 dark:bg-opacity-10 dark:text-blue-400 text-sm">
              <i className="i-lucide-handshake inline-block" /> You'll be logged
              in automatically here after you've verified your account!
            </div>

            <label className="block">
              <div>
                Username
                {usernameState.error && (
                  <small className="text-red-500 pl-2">
                    {usernameState.error.message}
                  </small>
                )}
              </div>
              <Input
                {...register("username", {
                  required: true,
                  pattern: USERNAME_REGEX,
                })}
              />
              <small className="text-secondary">
                This can never be changed.
              </small>
            </label>

            <label className="block mt-2">
              <div>
                Email{" "}
                {emailState.error && (
                  <small className="text-red-500 pl-2">
                    {emailState.error.message}
                  </small>
                )}
              </div>

              <Input
                {...register("email", {
                  required: true,
                  setValueAs(v) {
                    return v.toLowerCase();
                  },
                })}
              />
              <small className="text-secondary" style={{ lineHeight: "1rem" }}>
                You'll need to verify your account.{" "}
              </small>
            </label>

            <label className="block mt-2">
              Password
              <Input
                type="password"
                {...register("password", { required: true, minLength: 8 })}
              />
              <small className="text-secondary">Minimum of 8 characters</small>
            </label>

            <div className="mt-2 flex items-center justify-between">
              <Button disabled={fetcher.state === "submitting"}>
                {fetcher.state === "submitting"
                  ? "Creating account..."
                  : "Create an account"}
              </Button>
              <div className="flex items-center gap-2">
                <Input
                  id="remember"
                  type="checkbox"
                  className="!h-4 !w-4 !rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                  {...register("remember")}
                />
                <label
                  htmlFor="remember"
                  className="block text-sm text-gray-900 dark:text-white"
                >
                  Remember me
                </label>
              </div>
            </div>

            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <Link className="underline font-medium text-rose-500" to="/login">
                Log in
              </Link>{" "}
              instead.
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
