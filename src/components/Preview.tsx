import { useEffect, useState } from 'react';
import Card from '../components/shared/Card';

const Preview = ({ recipe }: any) => {
  const [width, setWidth] = useState(window.innerWidth);

  const detectResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', detectResize);

    return () => {
      window.removeEventListener('resize', detectResize);
    };
  }, [width]);

  return (
    <Card>
      <div className='avatar sm:pl-2'>
        <div className='w-48 h-4w-48 xs:w-64 xs:h-64 rounded-t sm:rounded'>
          <img src={recipe.data.imgUrls[0]} alt={recipe.data.name} />
        </div>
      </div>
      <div className='flex flex-col justify-evenly items-center h-full px-2 sm:pl-0 sm:pr-6 sm:items-start'>
        <p className='text-white mb-1 sm:mb-0 md:mb-1 text-md xs:text-xl md:text-2xl 2xl:text-3xl'>
          {recipe.data.name}
        </p>

        {width > 1280 ? (
          <p className='text-white 2xl:tracking-widest'>
            {recipe.data.description}
          </p>
        ) : width > 1024 ? (
          <p className='text-white'>
            {recipe.data.description.split(' ').slice(0, 75).join(' ')}
            ...
          </p>
        ) : (
          <p className='text-white text-xs xs:text-base sm:tracking-tighter sm:text-xs md:text-sm md:tracking-normal'>
            {recipe.data.description.split(' ').slice(0, 55).join(' ')}
            ...
          </p>
        )}

        <button className='btn-xs xs:btn-sm mdlg:btn w-max self-end mb-1 rounded-md bg-slate-700 text-white mdlg:border-none mdlg:bg-slate-700 mdlg:text-white'>
          View Recipe
        </button>
      </div>
    </Card>
  );
};
export default Preview;
