import React from "react";
import clsx from "clsx";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div
      className={clsx(
        "mx-auto container max-w-7xl px-6 md:px-12 xl:px-6 bg-dotted-pattern bg-contain",
        className
      )}
    >
      {children}
    </div>
  );
}
