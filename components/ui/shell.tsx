import Side from './side-nav';
import Nav from './dash-nav';

const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full w-full'>
      <aside className='h-full w-[200px] min-w-[200px] max-w-[200px] border-r border-gray-200 md:block'>
        <Side />
      </aside>
      <div className='w-[calc(100vw-200px)]'>
        <Nav />
        <main className='h-[calc(100vh-65px)]'>{children}</main>
      </div>
    </div>
  );
};

export default Shell;
