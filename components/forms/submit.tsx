'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

interface Props extends React.PropsWithChildren {
  label: string;
}

const Submit = ({ label, ...btnProps }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...btnProps}
      className='inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-[#AA55F7] hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
      type='submit'
      isLoading={pending}
    >
      {label}
    </Button>
  );
};

export default Submit;
