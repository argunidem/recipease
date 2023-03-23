import { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../context/auth/AuthContext';
import { db } from '../firebase.config';
import Section from '../components/shared/Section';
import Spinner from '../components/shared/Spinner';

const Recipe = () => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [canDelete, setCanDelete] = useState(false);

  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const params: any = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(db, 'users', recipe?.userRef));
      if (userDoc.exists()) {
        setUsername(userDoc.data().name);
      }

      if (recipe?.userRef === context?.user?.id) setCanDelete(true);
    };

    if (recipe) fetchUser();
  }, [recipe, context?.user?.id]);

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

  useEffect(() => {}, []);

  const deleteRecipe = async (id: string) => {
    await deleteDoc(doc(db, 'recipes', id));
  };

  return (
    <Section>
      <div className='relative flex flex-col max-w-7xl mx-auto my-20 rounded-md xs:px-4 xs:mt-28 md:mt-32'>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div>
              {canDelete && (
                <Fragment>
                  {/* Modal */}
                  <label
                    htmlFor='my-modal'
                    className='absolute -top-9 right-0 rounded-md bg-red-700 text-white cursor-pointer hover:bg-red-600 xs:right-4 sm:-top-14'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </label>
                  <input
                    type='checkbox'
                    id='my-modal'
                    className='modal-toggle'
                  />
                  <div className='modal'>
                    <div className='modal-box bg-recipease-50'>
                      <p className='font-bold text-lg text-white'>
                        Delete Recipe?
                      </p>
                      <div className='modal-action'>
                        <label
                          onClick={() => deleteRecipe(params.recipeId)}
                          htmlFor='my-modal'
                          className='btn bg-white text-recipease-50 hover:border-white hover:bg-recipease-50 hover:border hover:text-white'
                        >
                          Yes
                        </label>
                        <label
                          htmlFor='my-modal'
                          className='btn btn-outline text-white hover:bg-white hover:text-recipease-50'
                        >
                          no
                        </label>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
              <span className='absolute -top-9 left-0 text-xs xs:left-3.5 sm:text-sm sm:-top-6 '>
                by {username}
              </span>
              <span className='absolute -top-5 left-0 text-xs xs:left-3.5 sm:text-sm sm:-top-6 sm:left-auto sm:right-3.5'>
                {recipe.date}
              </span>
            </div>
            <div className='flex flex-col bg-recipease-600 text-white rounded-t-md md:flex-row'>
              <img
                loading='lazy'
                src={recipe.image}
                alt='food'
                className='w-full h-52 object-cover object-center rounded-t-md xs:h-80 md:w-2/5 sm:h-100 md:h-auto md:rounded-tr-none xl:h-96'
              />
              <div className='self-center p-4 sm:py-5 lg:px-7'>
                <h3 className='mb-1 text-lg font-bold sm:mb-2 mdlg:font-extrabold mdlg:text-xl'>
                  {recipe.name}
                </h3>
                <p className='text-sm md:justify-self-end mdlg:leading-6 mdlg:text-base mdlg:font-light lg:leading-7 xl:leading-8 2xl:text-lg'>
                  {recipe.description}
                </p>
              </div>
            </div>
            <div className='flex flex-col justify-center items-center space-y-3 p-4 bg-white text-recipease-600 border-x border-slate-200 sm:py-8 sm:space-y-5'>
              <h3 className='font-extrabold'>Ingredients</h3>
              <ul
                className={`${
                  recipe.ingredients.length > 8 &&
                  'xl:w-3/5 xl:mx-auto xl:grid xl:grid-cols-2 xl:pl-4'
                }`}
              >
                {recipe.ingredients.map(
                  (ingredient: string[], index: number) => (
                    <li key={index} className='mb-1 ml-5 list-disc font-light'>
                      {ingredient}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className='flex flex-col justify-center items-center space-y-3 p-4 bg-recipease-500 text-white rounded-b-md sm:py-8 sm:space-y-5'>
              <h3 className='font-extrabold'>Instructions</h3>
              <ol className=''>
                {recipe.instructions.map(
                  (instruction: string[], index: number) => (
                    <li
                      key={index}
                      className='mb-1 ml-5 list-decimal text-sm font-medium'
                    >
                      {instruction}
                    </li>
                  )
                )}
              </ol>
            </div>
          </Fragment>
        )}
      </div>
    </Section>
  );
};
export default Recipe;
