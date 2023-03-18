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
import Preview from '../components/Preview';
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
    };

    fetchRecipes();
  }, []);

  return (
    <Section>
      <header className='z-10 text-3xl text-recipease-100 bg-white'>
        {params.categoryId?.charAt(0).toUpperCase() +
          (params.categoryId?.slice(1) || '')}
      </header>

      {loading ? (
        <Spinner />
      ) : recipes && recipes.length > 0 ? (
        <div className='container'>
          {recipes.map((recipe: any) => (
            <Preview key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No recipes in {params.categoryId} category yet.</p>
      )}
    </Section>
  );
};
export default Category;
