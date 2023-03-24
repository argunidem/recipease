import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RecipeContext } from '../../../context/recipe/RecipeContext';
import { SearchContext } from '../../../context/search/SearchContext';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  states: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const Search = ({ states }: SearchProps) => {
  const [recipes, setRecipes] = useState<any>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<any>(null);

  const recipeContext = useContext(RecipeContext);
  const searchContext = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { open, setOpen } = states;

  useEffect(() => {
    if (recipeContext?.recipes) {
      setRecipes(recipeContext?.recipes);
    }
  }, [recipeContext?.recipes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    if (searchQuery.trim() === '') {
      setFilteredRecipes(null);
    } else {
      const regex = new RegExp(searchQuery, 'i');
      const filteredArray = recipes.filter((recipe: any) =>
        regex.test(recipe.data.name)
      );
      if (filteredArray.length < 1) {
        setFilteredRecipes(null);
      } else {
        setFilteredRecipes(filteredArray);
      }
    }
  };

  const submitHandler = () => {
    setOpen(false);
    searchContext?.setRecipes(filteredRecipes);
  };

  return (
    <div className='relative flex flex-col justify-center rounded-md mt-5'>
      <input
        type='text'
        placeholder='Search'
        ref={inputRef}
        onChange={handleChange}
        className={`duration-300 ${
          open
            ? 'w-full pr-11 pl-2 bg-white text-slate-600 font-semibold selection:bg-slate-700 selection:text-white'
            : 'w-0  bg-transparent'
        } ${
          filteredRecipes &&
          open &&
          'rounded-b-none border-b border-b-slate-300'
        }`}
      />

      {open ? (
        <Link
          to='/search'
          onClick={submitHandler}
          className={`sidebar-item mt-0 absolute right-0 top-0 text-white text-2xl border-none outline-none cursor-pointer rounded-l-none bg-recipease-200 hover:bg-recipease-100 ${
            filteredRecipes ? 'rounded-br-none' : 'rounded-r-md'
          }`}
        >
          <BsSearch />
        </Link>
      ) : (
        <span
          onClick={() => {
            setOpen(true);
            inputRef.current?.focus();
          }}
          className={`sidebar-item mt-0 absolute right-0 top-0 text-white text-2xl border-none outline-none cursor-pointer btn btn-ghost rounded-md ${
            filteredRecipes ? 'rounded-br-none' : 'rounded-r-md'
          }`}
        >
          <BsSearch />
        </span>
      )}
      {open && (
        <div
          className={`search-results w-full bg-white text-slate-900 rounded-b-md ${
            filteredRecipes && 'show'
          }`}
        >
          {filteredRecipes &&
            filteredRecipes.map((recipe: any, index: number) => (
              <div
                onClick={() => {
                  navigate(`/${recipe.data.category}/${recipe.id}`);
                  setOpen(false);
                }}
                key={index}
                className={`py-0.5 pl-2 text-sm font-medium text-recipease-200 ${
                  index !== filteredRecipes.length - 1
                    ? 'border-b border-slate-300'
                    : 'rounded-b-md'
                } cursor-pointer hover:bg-recipease-200 hover:text-white`}
              >
                {recipe.data.name.slice(0, 26)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default Search;
