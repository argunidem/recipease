import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Section from '../components/shared/Section';
import Spinner from '../components/shared/Spinner';

const Category = () => {
  const [recipes, setRecipes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesRef = collection(db, 'recipes');

        const q = query(
          recipesRef,
          where('category', '==', params.categoryId),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        const querySnap = await getDocs(q);

        let recipes: any = [];

        querySnap.forEach((doc) => {
          return recipes.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setRecipes(recipes);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch recipes');
      }

      console.log(recipes);
    };

    fetchRecipes();
  }, []);

  return (
    <Section>
      <header className='text-3xl text-recipease-100 bg-white'>
        {params.categoryId?.charAt(0).toUpperCase() +
          (params.categoryId?.slice(1) || '')}
      </header>

      {loading ? (
        <Spinner />
      ) : recipes && recipes.length > 0 ? (
        <div className='container'>
          {recipes.map((recipe: any) => (
            <article
              key={recipe.id}
              className='flex space-x-6 rounded-md bg-recipease-200 p-2'
            >
              <div className='avatar'>
                <div className='w-64 h-64 rounded'>
                  <img src={recipe.data.imgUrls[0]} />
                </div>
              </div>
              <div className='flex flex-col pr-6'>
                <p className='text-white text-2xl mb-1'>{recipe.data.name}</p>
                <p className='text-white'>{recipe.data.description}</p>
                <button className='self-end btn bg-slate-800 w-max text-white'>
                  View Recipe
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>No recipes in {params.categoryId} category yet.</p>
      )}
    </Section>
  );
};
export default Category;
