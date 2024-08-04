import { Spinner } from '@nextui-org/spinner';

const RsvpsLoader = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <Spinner color='danger' />
    </div>
  );
};

export default RsvpsLoader;
