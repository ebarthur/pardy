import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
	json,
	redirect,
} from "@remix-run/node";
import {
	Form,
	useActionData,
	useLoaderData,
	useNavigation,
	useSubmit,
} from "@remix-run/react";
import React, { useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { compare, hash } from "~/lib/password.server";
import { prisma } from "~/lib/prisma.server";
import { getUser, getUserId } from "~/lib/session.server";

const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await getUser(request);
	invariant(user, "User must be logged in to access this page");
	return json({ user });
};

export async function action({ request }: ActionFunctionArgs) {
	if (request.method !== "POST") {
		return json(null, {
			status: 405,
			statusText: "Method Not Allow",
		});
	}

	const formData = await request.formData();
	const currentPass = formData.get("currentPass");
	const newPass = formData.get("newPass");

	invariant(
		typeof currentPass === "string",
		"Current password must be a string",
	);
	invariant(typeof newPass === "string", "New password must be a string");

	const userId = await getUserId(request);
	invariant(userId, "User must be logged in to change password");

	const authCredential = await prisma.authCredential.findUnique({
		where: { userId },
	});
	if (!authCredential) {
		return json({ error: "Invalid credentials" }, { status: 400 });
	}

	const passwordMatch = await compare(currentPass, authCredential.password);
	if (!passwordMatch) {
		return json({ error: "Incorrect current password" }, { status: 400 });
	}

	if (currentPass === newPass) {
		return json(
			{ error: "New password must be different from the current password" },
			{ status: 400 },
		);
	}

	await prisma.authCredential.update({
		where: { userId },
		data: { password: await hash(newPass) },
	});

	return json({ success: "Password updated successfully" });
}

export const meta: MetaFunction = () => {
	return [{ title: "Dashboard 🎉 Pardy" }];
};

export default function Settings() {
	const { user } = useLoaderData<typeof loader>();
	const actionData = useActionData<{ error?: string; success?: string }>();
	const navigation = useNavigation();
	const formRef = useRef<HTMLFormElement>(null);
	const submit = useSubmit();

	useEffect(() => {
		if (actionData?.success && formRef.current) {
			formRef.current.reset();
		}
	}, [actionData]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		submit(event.currentTarget, { method: "post" });
	};

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
				Profile <div className="i-lucide-user-round-cog" />
			</h2>
			<p className="text-sm text-secondary mb-6">
				Manage your profile settings
			</p>

			<Form
				ref={formRef}
				method="post"
				onSubmit={handleSubmit}
				className="space-y-6"
			>
				<div>
					<label htmlFor="username" className="block text-sm font-medium mb-1">
						Username
					</label>
					<Input
						disabled
						type="text"
						name="username"
						id="username"
						defaultValue={user.username}
						required
					/>
				</div>

				<div>
					<label htmlFor="email" className="block text-sm font-medium mb-1">
						Email
					</label>
					<Input
						disabled
						type="email"
						name="email"
						id="email"
						defaultValue={user.email}
					/>
				</div>

				<div>
					<label
						htmlFor="currentPass"
						className="block text-sm font-medium mb-1"
					>
						Current Password
					</label>
					<Input
						type="password"
						name="currentPass"
						id="currentPass"
						placeholder="Enter current password"
						required
					/>
				</div>

				<div>
					<label htmlFor="newPass" className="block text-sm font-medium mb-1">
						New Password
					</label>
					<Input
						type="password"
						name="newPass"
						id="newPass"
						placeholder="Enter new password"
						required
						minLength={8}
					/>
					<small className="text-gray-500">Minimum of 8 characters</small>
				</div>

				{actionData?.error && (
					<div className="p-2 rounded-lg bg-red-50 text-sm text-red-500 dark:bg-red-700 dark:bg-opacity-10 dark:text-red-400">
						{actionData.error}
					</div>
				)}

				{actionData?.success && (
					<div className="p-2 rounded-lg bg-green-50 text-sm text-green-500 dark:bg-green-700 dark:bg-opacity-10 dark:text-green-400">
						{actionData.success}
					</div>
				)}

				<Button type="submit" disabled={navigation.state === "submitting"}>
					{navigation.state === "submitting"
						? "Updating..."
						: "Update Password"}
				</Button>
			</Form>
		</div>
	);
}

export { loader };
