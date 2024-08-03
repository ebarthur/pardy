"use server";

import { signUp } from "@/server/auth.server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";

const authSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
});

export const registerUser = async (_: unknown, formData: FormData) => {
	const data = authSchema.parse({
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
	});

	try {
		const { message } = await signUp(data);
		toast.success(message);
	} catch (e) {
		console.error(e);
		return { message: "Failed to sign you up" };
	}
	redirect("/sign-in");
};
