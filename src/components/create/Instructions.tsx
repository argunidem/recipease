import { useState } from 'react';
import { BsInfoSquareFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

type IngredientsProps = {
  listHandler: (value: string | number, instruction: boolean) => void;
};

const Instructions = ({ listHandler }: IngredientsProps) => {
  const [list, setList] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState('');
  const [count, setCount] = useState(1);

  const onchange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredient(e.target.value);
  };

  const onclick = (index?: number) => {
    if (index) {
      listHandler(index, true);
      setList((prevState) => prevState.filter((item, i) => index - 1 !== i));
      setCount(list.length);
    } else if (ingredient.length < 1) {
      toast.error('Fill out the textarea to add new instruction');
    } else {
      listHandler(ingredient, true);
      setList([...list, ingredient]);
      setCount((count) => count + 1);
      setIngredient('');
    }
  };

  return (
    <div className='flex w-full flex-col justify-center space-y-0.5'>
      <div className='relative'>
        <span className='absolute top-0 right-0 w-12 bg-base-100 flex items-center justify-center border-b border-l rounded-tr-md border-white'>
          {count}
        </span>
        <textarea
          value={ingredient}
          onChange={onchange}
          placeholder='Type Instruction'
          rows={6}
          className='input-field pl-1 pr-16 pt-2 outline-none focus:outline-none rounded-br-none textarea textarea-lg'
        />
      </div>
      <button
        onClick={(e) => onclick()}
        className='btn w-full hover:btn-outline'
      >
        Add Instruction
      </button>
      <div className='relative bg-neutral py-2 rounded-md'>
        <BsInfoSquareFill className='authentication-icon top-2 xs:top-3' />
        <p className='text-center text-xs xs:text-base'>
          {list.length < 1 ? 'No instructions added' : 'Instructions List'}
        </p>

        {list.map((item, index) => (
          <div
            key={index}
            className={`flex justify-evenly space-x-2 items-center py-3 border-slate-400 ${
              index === 0 && 'border-t mt-2'
            } ${index !== list.length - 1 && 'border-b'}`}
          >
            <span className='bg-base-100 w-6 h-6 rounded-lg text-center'>
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
export default Instructions;
