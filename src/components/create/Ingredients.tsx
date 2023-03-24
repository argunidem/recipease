import { useState, useEffect } from 'react';
import { HiPuzzlePiece } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

type IngredientsProps = {
  listHandler: (value: string | number) => void;
  editIngredients?: string[];
};

const Ingredients = ({ listHandler, editIngredients }: IngredientsProps) => {
  const [list, setList] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (editIngredients) setList(editIngredients);
  }, [editIngredients]);

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(e.target.value);
  };

  const onclick = (index?: number) => {
    if (index) {
      listHandler(index);
      setList((prevState) => prevState.filter((item, i) => index - 1 !== i));
      setCount(list.length);
    } else if (ingredient.length < 1) {
      toast.error('Fill out the input field to add new ingredient');
    } else {
      listHandler(ingredient);
      setList([...list, ingredient]);
      setCount((count) => count + 1);
      setIngredient('');
    }
  };

  return (
    <div className='flex w-full flex-col justify-center space-y-0.5'>
      <div className='flex w-full flex-col justify-center space-y-0.5 xs:space-y-0 xs:flex-row'>
        <span className='bg-recipease-700 flex items-center justify-center rounded-md xs:w-1/4 xs:rounded-r-none xs:border-r xs:border-r-white'>
          {count}
        </span>
        <input
          type='text'
          value={ingredient}
          onChange={onchange}
          placeholder='Type Ingredient'
          className='bg-recipease-700 xs:w-3/4 xs:rounded-l-none focus:bg-recipease-50'
        />
      </div>
      <button
        onClick={(e) => onclick()}
        className='btn w-full bg-recipease-700 text-white hover:bg-recipease-800'
      >
        Add Ingredient
      </button>
      <div className='relative bg-slate-300 text-recipease-800 py-2 rounded-md'>
        <HiPuzzlePiece className='authentication-icon top-2 xs:top-3' />
        <p className='text-center text-xs font-medium xs:text-base'>
          {list.length < 1 ? 'No ingredients added' : 'Ingredients List'}
        </p>

        {list.map((item, index) => (
          <div
            key={index}
            className={`flex justify-evenly space-x-2 items-center py-3 border-slate-400 ${
              index === 0 && 'border-t mt-2'
            } ${index !== list.length - 1 && 'border-b'}`}
          >
            <span className='bg-base-100 text-slate-300 w-6 h-6 rounded-lg text-center'>
              {index + 1}
            </span>
            <p
              key={index}
              className='w-28 text-sm xs:text-base xs:w-44 break-words text-center'
            >
              {item}
            </p>
            <IoMdClose
              onClick={(e) => onclick(index + 1)}
              className='w-6 h-6 rounded-md text-white bg-red-800 text-2xl cursor-pointer hover:bg-red-700'
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Ingredients;
