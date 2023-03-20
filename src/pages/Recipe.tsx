import { Fragment, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { AuthContext } from '../context/auth/AuthContext';
import Section from '../components/shared/Section';
import Spinner from '../components/shared/Spinner';

const Recipe = () => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthContext);

  const navigate = useNavigate();
  const params: any = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, 'recipes', params.recipeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const date = new Date(docSnap.data().timestamp.seconds * 1000);
        setRecipe({
          ...docSnap.data(),
          date:
            date.getHours() +
            ':' +
            date.getMinutes() +
            ', ' +
            date.toDateString(),
        });
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [navigate, params.recipeId]);

  return (
    <Section>
      <div className='relative flex flex-col items-stretch max-w-7xl mx-auto mt-20 rounded-md xs:px-4 xs:mt-28 md:mt-32'>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {/* {date && (
              
            )}
              */}
            <Fragment>
              <span className='absolute -top-9 left-0 text-xs xs:left-3.5 sm:text-sm sm:-top-6 '>
                by {context?.user?.username}
              </span>
              <span className='absolute -top-5 left-0 text-xs xs:left-3.5 sm:text-sm sm:-top-6 sm:left-auto sm:right-3.5'>
                {recipe.date}
              </span>
            </Fragment>
            <div className='flex flex-col w-full bg-recipease-600 text-white rounded-t-md md:flex-row'>
              <img
                loading='lazy'
                src={recipe.image}
                alt='food'
                className='w-full h-52 object-cover object-center rounded-t-md xs:h-80 sm:h-100 md:w-2/5 md:h-96 md:rounded-tr-none'
              />
              <p className='self-center p-4 text-sm sm:py-10 md:justify-self-end md:py-0 mdlg:leading-6 lg:text-base lg:px-5 lg:leading-7 xl:leading-8 2xl:text-lg'>
                {recipe.description}
              </p>
            </div>
            <div className='w-full h-96 bg-white border-r border-l border-slate-200'></div>
            <div className='w-full h-96 bg-recipease-500 rounded-b-md'></div>
          </Fragment>
        )}
      </div>
    </Section>
  );
};
export default Recipe;
