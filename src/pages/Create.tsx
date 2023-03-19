import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import Section from '../components/shared/Section';
import Ingredients from '../components/create/Ingredients';
import Instructions from '../components/create/Instructions';
import Spinner from '../components/shared/Spinner';
import { BsFillImageFill } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import { ImSpoonKnife } from 'react-icons/im';
import { MdOutlineDescription } from 'react-icons/md';

type FormDataType = {
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  imgUrls: object;
  userRef: string;
};

const Create = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    description: '',
    category: '',
    ingredients: [],
    instructions: [],
    imgUrls: {},
    userRef: '',
  });
  const [loading, setLoading] = useState(false);

  const { name, description, category, ingredients, instructions, imgUrls } =
    formData;

  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context?.user) {
      setFormData({ ...formData, userRef: context?.user.id });
    }
  }, [context?.user]);

  const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {};

  const listHandler = (value: string | number, instruction?: boolean) => {
    if (!instruction) {
      if (typeof value === 'string') {
        setFormData({ ...formData, ingredients: [...ingredients, value] });
      } else {
        setFormData({
          ...formData,
          ingredients: ingredients.filter((item, index) => {
            return index !== value - 1;
          }),
        });
      }
    } else {
      if (typeof value === 'string') {
        setFormData({ ...formData, instructions: [...instructions, value] });
      } else {
        setFormData({
          ...formData,
          instructions: instructions.filter((item, index) => {
            return index !== value - 1;
          }),
        });
      }
    }
  };

  return (
    <Section>
      <div className='container mb-72'>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <header>
              <p className='heading'>Create Your Recipe</p>
            </header>

            <form onSubmit={onsubmit} className='form'>
              <div className='relative w-full'>
                <ImSpoonKnife className='authentication-icon' />
                <input
                  type='text'
                  placeholder='Food Name'
                  id='name'
                  value={name}
                  onChange={onchange}
                  required
                  className='input-field'
                />
              </div>
              <div className='relative w-full'>
                <MdOutlineDescription className='authentication-icon top-2.5' />
                <textarea
                  placeholder='Description'
                  id='description'
                  value={description}
                  onChange={onchange}
                  required
                  rows={6}
                  className='input-field pt-2 outline-none focus:outline-none rounded-br-none textarea textarea-lg'
                />
              </div>

              <div className='relative w-full'>
                <BiCategory className='authentication-icon top-4' />
                <select
                  id='category'
                  value={category}
                  onChange={onchange}
                  placeholder='Category'
                  required
                  className='input-field select outline-none focus:outline-none'
                >
                  <option>Appetizers</option>
                  <option>Baking</option>
                  <option>Beverages</option>
                  <option>Breakfast</option>
                  <option>Desserts</option>
                  <option>Grilling</option>
                  <option>Pasta</option>
                  <option>Salads</option>
                  <option>Seafood</option>
                  <option>Snacks</option>
                  <option>Soups</option>
                  <option>Vegetarian</option>
                </select>
              </div>

              <Ingredients listHandler={listHandler} />
              <Instructions listHandler={listHandler} />
            </form>
          </Fragment>
        )}
      </div>
    </Section>
  );
};
export default Create;
