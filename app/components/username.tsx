import { User } from "@prisma/client";
import { Jsonify } from "type-fest";

interface Props {
	user: User | Jsonify<User>;
	showVerfied?: boolean;
}

function Username({ showVerfied, user }: Props) {
	return (
		<span className="inline-flex gap-1 items-center">
			@{user.username}{" "}
			{user.verified && showVerfied && (
				<div className="inline-block i-lucide-verified text-green-500" />
			)}
			{/* admin */}
			{user.username === "admin" && (
				<div className="inline-block i-lucide-crown text-amber-500" />
			)}
		</span>
	);
}

export { Username };
