"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

const Submit = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...btnProps}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-[#9333EA] hover:text-primary-foreground"
      type="submit"
      isLoading={pending}
    >
      {label}
    </Button>
  );
};

export default Submit;
