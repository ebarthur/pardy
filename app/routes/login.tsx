import {
	LoaderFunctionArgs,
	MetaFunction,
	json,
	redirect,
} from "@remix-run/node";
import { ActionFunctionArgs } from "@remix-run/node";
import {
	Link,
	useActionData,
	useNavigation,
	useSubmit,
} from "@remix-run/react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Layout } from "~/components/layout";
import { compare } from "~/lib/password.server";
import { prisma } from "~/lib/prisma.server";
import { createUserSession, getUser } from "~/lib/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	try {
		await getUser(request);
		return redirect("/s");
	} catch (_error) {
		//
	}
	return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
	if (request.method !== "POST") {
		return json(null, {
			status: 405,
			statusText: "Method Not Allow",
		});
	}

	const { email, password, remember } = await request.json();

	const user = await prisma.user.findFirst({
		where: {
			OR: [{ email }, { username: email }],
		},
	});

	if (!user) {
		return json(
			{
				type: "invalid-credentials",
				message: "Invalid email or password",
			},
			{ status: 400 },
		);
	}

	const authCredential = await prisma.authCredential.findFirst({
		where: {
			userId: user.id,
		},
	});

	if (!authCredential) {
		return json(
			{
				type: "invalid-credentials",
				message: "Invalid email/username or password",
			},
			{ status: 400 },
		);
	}

	const passwordMatch = await compare(password, authCredential.password);

	if (!passwordMatch) {
		return json(
			{
				type: "invalid-credentials",
				message: "Invalid email/username or password",
			},
			{ status: 400 },
		);
	}

	if (!user.verified) {
		return json(
			{
				type: "unverified-account",
				message: "Unverified account",
			},
			{ status: 400 },
		);
	}
	return createUserSession({
		request,
		userId: user.id,
		redirectTo: "/s",
		remember: remember ? true : false,
	});
};

export const meta: MetaFunction = () => {
	return [{ title: "Login 🎉 Pardy" }];
};

export default function login() {
	const { register, handleSubmit, watch } = useForm();
	const actionData = useActionData<typeof action>();
	const submit = useSubmit();
	const navigation = useNavigation();

	async function login(data: FieldValues) {
		submit(JSON.stringify(data), {
			method: "POST",
			encType: "application/json",
		});
	}

	const $email = watch("email");

	return (
		<Layout>
			<div className="min-h-[60vh]">
				<div className="lg-max-w-[24rem] mx-auto">
					<form
						className="bg-white dark:bg-neutral-900 rounded-lg border dark:border-neutral-800 p-4 mt-12"
						onSubmit={handleSubmit(login)}
					>
						<h1 className="font-bold text-xl mb-2">Login</h1>

						<div className="rounded-lg p-2 bg-blue-50 text-blue-500 my-2 dark:bg-blue-700 dark:bg-opacity-10 dark:text-blue-400 text-sm">
							<i className="i-lucide-handshake inline-block" /> You might not be
							too late for the show!
						</div>

						{actionData && (
							<div className="p-2 rounded-lg bg-red-50 text-sm text-red-500 dark:bg-red-700 dark:bg-opacity-10 dark:text-red-400 mb-2">
								{actionData.type === "invalid-credentials" &&
									actionData?.message}

								{actionData.type === "unverified-account" && (
									<>
										You need to verify your email to be able to login. Check
										your inbox.{" "}
										<a
											className="underline font-medium dark:text-red-200"
											href={`/resend-verification?email=${$email}`}
										>
											Resend email
										</a>{" "}
										if you can't find it.
									</>
								)}
							</div>
						)}

						<label>
							Email or username
							<Input
								{...register("email", {
									required: true,
									setValueAs(v) {
										return v.toLowerCase();
									},
								})}
							/>
						</label>

						<label className="block mt-2">
							Password
							<Input
								type="password"
								{...register("password", { required: true })}
							/>
							<small className="text-secondary">
								Forgot your password?{" "}
								<Link className="underline" to="/forgot-password">
									Click here to reset
								</Link>
							</small>
						</label>

						<div className="mt-2 flex gap-4 items-center justify-between">
							<Button disabled={navigation.state === "submitting"}>
								{navigation.state === "submitting" ? "Please wait…" : "Login"}
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

						<div className="mt-4 text-sm flex items-center gap-2">
							<Link
								className="underline font-medium text-green-600"
								to="/create-account"
							>
								Create an account
							</Link>{" "}
							to join the <div className="i-lucide-handshake" />
							<p>Pardy</p>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
