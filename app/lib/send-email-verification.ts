import { type EmailVerificationRequest } from "@prisma/client";
import { send } from "./mail.server";
import { prisma } from "./prisma.server";
import { randomStr } from "./random-str";
import invariant from "tiny-invariant";

async function sendEmailVerification(email: string) {
	const existingVerification = await prisma.emailVerificationRequest.findFirst({
		where: { email },
	});

	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	invariant(user);

	const username = user.username;

	if (!existingVerification) {
		const verification = await prisma.emailVerificationRequest.create({
			data: {
				token: randomStr(48),
				email,
			},
		});
		return await sendEmail(verification, username);
	}
}

async function sendEmail(
	verification: EmailVerificationRequest,
	username: string,
) {
	const domain = process.env.DOMAIN;
	const { email, token } = verification;

	const link = [
		`http://${domain}/verify-email/?`,
		`email=${email}`,
		`&token=${token}`,
	].join("");

	return await send({
		to: verification.email,
		from: "pardy@ebartur.com",
		subject: `Pardy Email Verification: ${username}`,
		html: `<p>Hello 👋🏽,</p>
            <p>Thanks for choosing to secure your account <strong>${username}</strong> by providing an email address.</p>
            <p>If you submitted this request, please click on the following link to complete the verification process:</p>
            <p><a href="${link}">${link}</a></p>
            <p>Thank you!</p>
            <p><em>(You cannot reply to this email)</em></p>`,
	});
}

export { sendEmailVerification };
