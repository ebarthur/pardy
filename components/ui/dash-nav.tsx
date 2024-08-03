"use client";
import { Input } from "@nextui-org/react";
// import { createNewEvent } from '@/actions/events'
import { Button, Tooltip } from "@nextui-org/react";
import { CirclePlus } from "lucide-react";
import { useTransition } from "react";

const Nav = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      // createNewEvent()
    });
  };

  return (
    <nav className="h-[65px] border-b border-gray-200 flex items-center px-6 gap-4">
      <div>
        <Tooltip content="New Event">
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            isLoading={isPending}
            onClick={handleClick}
          >
            <CirclePlus size={16} />
          </Button>
        </Tooltip>
      </div>
      <div className="w-full">
        <Input size="sm" variant="faded" placeholder="search" />
      </div>
    </nav>
  );
};

export default Nav;
