import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import { RecipeContext } from '../context/recipe/RecipeContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase.config';
import Section from '../components/shared/Section';
import Ingredients from '../components/create/Ingredients';
import Instructions from '../components/create/Instructions';
import Spinner from '../components/shared/Spinner';
import { v4 as uuidv4 } from 'uuid';
import { categories, categorySlugs } from '../categories';
import { BiCategory } from 'react-icons/bi';
import { ImSpoonKnife } from 'react-icons/im';
import { MdOutlineDescription } from 'react-icons/md';
import { toast } from 'react-toastify';

type FormDataType = {
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  instructions: string[];
  image: any;
  userRef: string;
};

const Edit = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    description: '',
    category: '',
    ingredients: [],
    instructions: [],
    image: null,
    userRef: '',
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>(null);

  const { name, description, category, ingredients, instructions, image } =
    formData;
  const authContext = useContext(AuthContext);
  const recipeContext = useContext(RecipeContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (Array.isArray(recipeContext?.recipes)) {
      const recipe = recipeContext?.recipes.find((recipe) => {
        return recipe.id === params.recipeId;
      });
      setFormData((prevState) => ({
        ...prevState,
        ...recipe.data,
      }));
    }
  }, [recipeContext?.recipes, params.recipeId]);

  const saveChanges = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formDataCopy = {
        ...formData,
        timestamp: serverTimestamp(),
        category: category.replace(/\s+/g, '-').toLowerCase(),
      };

      if (typeof image !== 'string') {
        const fileName = `${authContext?.user?.id}-${
          image[0].name
        }-${uuidv4()}`;
        const storageRef = ref(storage, 'images/' + fileName);

        await uploadBytes(storageRef, image[0]);
        const url = await getDownloadURL(storageRef);
        formDataCopy.image = url;
      }

      if (params.recipeId) {
        const docRef = doc(db, 'recipes', params?.recipeId);
        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success('Recipe updated');
        navigate(
          `/${formData.category.replace(/\s+/g, '-').toLowerCase()}/${
            params.recipeId
          }`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const files = (e.target as HTMLInputElement).files;
    if (files && e.target.type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        image: files,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
              <p className='heading'>Edit Recipe</p>
            </header>

            <form
              onSubmit={(e) => saveChanges(e, params?.recipeId)}
              className='form'
            >
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
                  // value={category}
                  value={categories[categorySlugs.indexOf(category)]}
                  onChange={onchange}
                  required
                  className='input-field select outline-none focus:outline-none'
                >
                  {categories.map((category: string, index: number) => (
                    <option key={index}>{category}</option>
                  ))}
                </select>
              </div>

              <Ingredients
                listHandler={listHandler}
                editIngredients={formData.ingredients}
              />
              <Instructions
                listHandler={listHandler}
                editInstructions={formData.instructions}
              />
              <img
                src={imageUrl ? imageUrl : formData.image}
                alt='food'
                className='w-full min-w-[200px] xs:w-72 rounded-lg'
              />
              <input
                type='file'
                onChange={(e) => {
                  onchange(e);
                  handleImageChange(e);
                }}
                accept='.jpg,.png,.jpeg'
                className='input-field text-sm bg-neutral py-2 file:my-1 file:mr-2 file:px-3 file:rounded-md file:border file:border-slate-300
                file:text-sm file:font-medium
                file:bg-neutral hover:file:cursor-pointer hover:file:bg-slate-200 hover:file:text-slate-800'
              />
              <button
                type='submit'
                className='btn w-full text-white bg-recipease-50 border-none '
              >
                Update Recipe
              </button>
            </form>
          </Fragment>
        )}
      </div>
    </Section>
  );
};
export default Edit;
