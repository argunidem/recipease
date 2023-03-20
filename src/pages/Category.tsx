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
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Section from '../components/shared/Section';
import Preview from '../components/layout/Preview';
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
          where('category', '==', params.category),
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
    };

    fetchRecipes();
  }, [params.category]);

  return (
    <Section>
      <header className='text-3xl text-recipease-100'>
        {params.category?.charAt(0).toUpperCase() +
          (params.category?.slice(1) || '')}
      </header>

      {loading ? (
        <Spinner />
      ) : recipes && recipes.length > 0 ? (
        <div className='container space-y-16 md:space-y-20'>
          {recipes.map((recipe: any) => (
            <Preview key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes in {params.category} category yet.</p>
      )}
    </Section>
  );
};
export default Category;
