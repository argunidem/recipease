import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../context/search/SearchContext';
import Section from '../components/shared/Section';
import Preview from '../components/layout/Preview';
import Spinner from '../components/shared/Spinner';

const Search = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(SearchContext);

  useEffect(() => {
    setLoading(false);
  }, [context?.recipes]);

  return (
    <Section>
      <header className='text-3xl text-recipease-100'>Search Results</header>
      {loading ? (
        <Spinner />
      ) : context?.recipes && context.recipes.length > 0 ? (
        <div className='container mb-20 space-y-16 md:space-y-20'>
          {context.recipes.map((recipe: any) => (
            <Preview key={recipe.id} recipe={recipe} isCategory={true} />
          ))}
        </div>
      ) : (
        <p>No results.</p>
      )}
    </Section>
  );
};
export default Search;
