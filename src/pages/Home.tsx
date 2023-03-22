import { useEffect, useState, useContext } from 'react';
import { RecipeContext } from '../context/recipe/RecipeContext';
import Section from '../components/shared/Section';
import Preview from '../components/layout/Preview';
import Spinner from '../components/shared/Spinner';

const Home = () => {
  const [recipes, setRecipes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const context = useContext(RecipeContext);

  useEffect(() => {
    if (Array.isArray(context?.recipes)) {
      setRecipes(context?.recipes);
      setLoading(false);
    }
  }, [context?.recipes]);

  return (
    <Section>
      <header className='text-recipease-100 text-xl'>Latest Recipes</header>

      {loading ? (
        <Spinner />
      ) : (
        <div className='container mb-20 space-y-16 md:space-y-20'>
          {recipes.map((recipe: any) => (
            <Preview key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </Section>
  );
};

export default Home;
