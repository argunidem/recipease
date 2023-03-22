import { useEffect, useState, useContext } from 'react';
import { RecipeContext } from '../context/recipe/RecipeContext';
import { useParams } from 'react-router-dom';
import Section from '../components/shared/Section';
import Preview from '../components/layout/Preview';
import Spinner from '../components/shared/Spinner';

const Category = () => {
  const [recipes, setRecipes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const context = useContext(RecipeContext);

  useEffect(() => {
    if (Array.isArray(context?.recipes)) {
      setRecipes(
        context?.recipes.filter(
          (recipe: any) => recipe.data.category === params.category
        )
      );
      setLoading(false);
    }
  }, [context?.recipes, params]);

  return (
    <Section>
      <header className='text-3xl text-recipease-100'>
        {params.category
          ?.replace(/-/g, ' ')
          .replace(/(?:^|\s)(?!and)(\w)/g, (match) => match.toUpperCase())}
      </header>

      {loading ? (
        <Spinner />
      ) : recipes.length > 0 ? (
        <div className='container mb-20 space-y-16 md:space-y-20'>
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
