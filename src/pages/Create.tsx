import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../firebase.config';
import Section from '../components/shared/Section';
import Ingredients from '../components/create/Ingredients';
import Instructions from '../components/create/Instructions';
import Spinner from '../components/shared/Spinner';
import { v4 as uuidv4 } from 'uuid';
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
  images: any;
  userRef: string;
};

const Create = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    description: '',
    category: '',
    ingredients: [],
    instructions: [],
    images: {},
    userRef: '',
  });
  const [loading, setLoading] = useState(false);

  const { name, description, category, ingredients, instructions, images } =
    formData;

  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context?.user) {
      setFormData({ ...formData, userRef: context?.user.id });
    }
  }, [context?.user]);

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    //. Store images in firebase
    const storeImage = async (image: any) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${context?.user?.id}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error('Images not uploaded');
      return;
    });
    //.

    setLoading(false);
  };

  const onchange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        images: files,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
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
              <input
                type='file'
                onChange={onchange}
                accept='.jpg,.png,.jpeg'
                required
                className='input-field text-sm bg-neutral py-2
            file:my-1 file:mr-2 file:px-3
            file:rounded-md file:border file:border-slate-300
            file:text-sm file:font-medium
            file:bg-neutral hover:file:cursor-pointer hover:file:bg-slate-200 hover:file:text-slate-800'
              />
              <button
                type='submit'
                className='btn w-full text-white bg-emerald-700 border-none '
              >
                Create Recipe
              </button>
            </form>
          </Fragment>
        )}
      </div>
    </Section>
  );
};
export default Create;
