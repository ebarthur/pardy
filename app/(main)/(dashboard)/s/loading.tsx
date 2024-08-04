import { Spinner } from '@nextui-org/spinner';

const HomeLoader = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <Spinner color='primary' />
    </div>
  );
};

export default HomeLoader;
