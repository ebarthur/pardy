import React from "react";
import Side from "./side-nav";

const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full">
      <aside className="h-full w-[200px] min-w-[200px] max-w-[200px]">
        <Side />
      </aside>
      <div className="w-[calc(100vw-200px)]">
        <main className="h-[calc(100vh-65px)] px-4 py-6">{children}</main>
      </div>
    </div>
  );
};

export default Shell;
