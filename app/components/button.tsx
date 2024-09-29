import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentProps<"button"> {
	variant?: "primary" | "neutral" | "secondary" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
	({ className, variant = "primary", ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={clsx(
					"inline-flex items-center gap-2 rounded-lg bg-blue-600 px-2 py-1 font-medium",
					{
						"bg-zinc-200 px-2 py-1 !dark:bg-neutral-800": variant === "neutral",
						"text-white": variant === "primary",
						"!bg-amber-500 text-white": variant === "secondary",
						"bg-transparent border-1 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-zinc-700":
							variant === "ghost",
						"opacity-60": props.disabled,
					},
					className,
				)}
				type={props.type}
				{...props}
			/>
		);
	},
);

export { Button };
