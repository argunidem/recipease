import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import Card from '../shared/Card';

const Preview = ({ recipe }: any) => {
  const [width, setWidth] = useState(window.innerWidth);
  const { category, description, image, name, timestamp } = recipe.data;
  const context = useContext(AuthContext);
  const date = new Date(timestamp.seconds * 1000);

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
      <span className='absolute -top-9 left-0 text-xs sm:text-sm sm:-top-6 '>
        by {context?.user?.username}
      </span>
      <span className='absolute -top-5 left-0 text-xs sm:text-sm sm:-top-6 sm:left-auto sm:right-0'>
        {date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString()}
      </span>
      <div className='avatar mb-4 md:mb-0 md:pl-2 md:mr-6 md:w-1/2'>
        <div className='w-56 h-56 xs:w-full xs:h-full md:w-full md:h-64 rounded-t md:rounded'>
          <img src={image} alt={name} />
        </div>
      </div>
      <div className='flex flex-col justify-evenly items-center h-full font-red-hat px-2 md:pl-0 md:pr-6 md:items-start'>
        <p className='text-white mb-1 md:mb-0 text-lg sm:text-xl md:text-2xl 2xl:text-3xl'>
          {name}
        </p>

        {width > 1280 ? (
          <p className='text-white 2xl:tracking-widest'>{description}</p>
        ) : width > 1024 ? (
          <p className='text-white'>
            {description.split(' ').slice(0, 75).join(' ')}
            ...
          </p>
        ) : (
          <p className='text-white text-sm sm:text-base sm:mx-2 md:mx-0 md:text-sm md:tracking-normal'>
            {description.split(' ').slice(0, 55).join(' ')}
            ...
          </p>
        )}

        <Link
          to={`/${category}/${recipe.id}`}
          className='btn-xs flex items-center xs:btn-sm sm:btn-md w-max self-end my-2 rounded-md bg-slate-700 text-white md:mt-0 mdlg:border-none mdlg:bg-slate-700 mdlg:text-white'
        >
          View Recipe
        </Link>
      </div>
    </Card>
  );
};
export default Preview;
