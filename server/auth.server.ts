import "server-only";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

export async function signIn({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const url = new URL(`${BASE_URL}/auth/login`);

	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`${response.statusText}`);
		}

		const data = await response.json();

		const token = data.token;

		return { token };
	} catch (error) {
		throw new Error("Failed to sign in");
	}
}

export async function signUp({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}) {
	const url = new URL(`${BASE_URL}/auth/signup`);

	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ username, email, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status !== 201) {
			throw new Error(`Sign up failed: ${response.statusText}`);
		}

		return { message: "Sign up successful" };
	} catch (error) {
		throw new Error("Failed to sign up");
	}
}
