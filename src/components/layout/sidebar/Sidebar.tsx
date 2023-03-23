import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth/AuthContext';
import Categories from './Categories';
import {
  BsArrowLeftSquareFill,
  BsSearch,
  BsFillQuestionSquareFill,
} from 'react-icons/bs';
import { ImSpoonKnife } from 'react-icons/im';
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(AuthContext);

  const detectScroll = () => {
    if (window.scrollY > 116) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', detectScroll);

    return () => {
      window.removeEventListener('scroll', detectScroll);
    };
  }, [scrolled]);

  return (
    <div className='fixed left-0 top-0 bottom-0 z-20'>
      <div
        className={`relative bg-recipease-50 h-screen p-5 pt-7 ${
          open ? 'w-72' : 'w-20'
        } duration-500`}
      >
        <BsArrowLeftSquareFill
          className={`text-white bg-recipease-50 border border-recipease-50 text-4xl absolute -right-9 cursor-pointer duration-300 ${
            !open ? 'rotate-180 rounded-tl-md' : 'rounded-br-md'
          } ${scrolled ? 'top-0' : 'top-28'}`}
          onClick={() => setOpen(!open)}
        />

        <div
          className={`text-white transiton duration-500 ${
            scrolled ? 'mt-10' : 'mt-32'
          }`}
        >
          {context?.loggedIn && (
            <Link
              to='/create'
              onClick={() => setOpen(false)}
              className={`sidebar-item ${!open && 'justify-center'}`}
            >
              <span className='text-2xl'>
                <AiOutlinePlus />
              </span>
              <span className={`font-medium ${!open && 'hidden'}`}>Create</span>
            </Link>
          )}
          <div className='relative flex items-center rounded-md mt-5'>
            <input
              type='text'
              placeholder='Search'
              ref={inputRef}
              className={`duration-300 ${
                open
                  ? 'w-full pr-11 pl-2 bg-white text-slate-600 font-semibold selection:bg-slate-700 selection:text-white'
                  : 'w-0  bg-transparent'
              }`}
            />
            <span
              className={`sidebar-item mt-0 absolute right-0 top-0 text-white text-2xl border-none outline-none cursor-pointer ${
                open
                  ? 'rounded-l-none rounded-r-md bg-recipease-200 hover:bg-recipease-100'
                  : 'btn btn-ghost rounded-md'
              }`}
            >
              <BsSearch
                onClick={() => {
                  setOpen(!open);
                  if (!open) inputRef.current?.focus();
                }}
              />
            </span>
          </div>
          <Link
            to='/'
            onClick={() => setOpen(false)}
            className={`sidebar-item ${!open && 'justify-center'}`}
          >
            <span className='text-2xl'>
              <AiFillHome />
            </span>
            <span className={`font-medium ${!open && 'hidden'}`}>Home</span>
          </Link>
          <Link
            to='/about'
            onClick={() => setOpen(false)}
            className={`sidebar-item ${!open && 'justify-center'}`}
          >
            <span className='text-2xl'>
              <BsFillQuestionSquareFill />
            </span>
            <span className={`font-medium ${!open && 'hidden'}`}>About</span>
          </Link>
          <Categories states={{ open, setOpen, submenuOpen, setSubmenuOpen }} />
          <Link
            to='/my-recipes'
            onClick={() => setOpen(false)}
            className={`sidebar-item ${!open && 'justify-center'}`}
          >
            <span className='text-2xl'>
              <ImSpoonKnife />
            </span>
            <span
              className={`font-medium h-6 overflow-hidden ${!open && 'hidden'}`}
            >
              My Recipes
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
