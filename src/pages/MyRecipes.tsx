import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { RecipeContext } from '../context/recipe/RecipeContext';
import Section from '../components/shared/Section';
import Preview from '../components/layout/Preview';
import Spinner from '../components/shared/Spinner';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const recipeContext = useContext(RecipeContext);

  useEffect(() => {
    if (Array.isArray(recipeContext?.recipes)) {
      setRecipes(
        recipeContext?.recipes.filter((recipe) => {
          return recipe.data.userRef === authContext?.user?.id;
        })
      );
      setLoading(false);
    }
  }, [recipeContext?.recipes, authContext?.user?.id]);

  return (
    <Section>
      <header className='text-3xl text-recipease-100'>My Recipes</header>

      {loading ? (
        <Spinner />
      ) : (
        recipes.length > 0 && (
          <div className='container mb-20 space-y-16 md:space-y-20'>
            {recipes.map((recipe: any) => (
              <Preview key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )
      )}
    </Section>
  );
};
export default MyRecipes;
