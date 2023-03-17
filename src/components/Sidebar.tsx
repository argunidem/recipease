import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsArrowLeftSquareFill,
  BsSearch,
  BsFillQuestionSquareFill,
  BsChevronDown,
} from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  return (
    <div className='fixed left-0 top-0 bottom-0 z-20'>
      <div
        className={`relative bg-recipease-50 h-screen p-5 pt-7 ${
          open ? 'w-72' : 'w-20'
        } duration-500`}
      >
        <BsArrowLeftSquareFill
          className={`text-white bg-recipease-50 border border-recipease-50 rounded-md text-3xl absolute -right-3 top-32 cursor-pointer duration-300 ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />

        <div className='relative flex items-center rounded-md mt-48'>
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
          <BsSearch
            className={`absolute right-0 top-0 p-3 w-11 h-full text-white text-2xl border-none outline-none cursor-pointer ${
              open
                ? 'rounded-r-md bg-recipease-200 hover:bg-recipease-100'
                : 'btn btn-ghost rounded-md'
            }`}
            onClick={() => {
              setOpen(!open);
              if (!open) inputRef.current?.focus();
            }}
          />
        </div>

        <ul className='text-white'>
          <li
            onClick={() => {
              navigate('/');
              setOpen(false);
            }}
            className='sidebar-item'
          >
            <span className='text-2xl'>
              <AiFillHome />
            </span>
            <span className={`font-medium ${!open && 'hidden'}`}>Home</span>
          </li>
          <li
            onClick={() => {
              navigate('/about');
              setOpen(false);
            }}
            className='sidebar-item'
          >
            <span className='text-2xl'>
              <BsFillQuestionSquareFill />
            </span>
            <span className={`font-medium ${!open && 'hidden'}`}>About</span>
          </li>
          <li
            className='sidebar-item'
            onClick={() => {
              setSubmenuOpen(!submenuOpen);
              if (!open) setOpen(true);
            }}
          >
            <span className='text-2xl'>
              <BiCategory />
            </span>
            <span className={`font-medium flex-1 ${!open && 'hidden'}`}>
              Categories
            </span>
            {open && (
              <BsChevronDown
                className={`mr-1 duration-300 ${
                  submenuOpen && '-rotate-[180deg]'
                }`}
              />
            )}
          </li>

          <ul
            className={` h-0 overflow-auto transition-all duration-300 ${
              open && submenuOpen && 'h-44'
            }`}
          >
            <li onClick={() => navigate('/asian')} className='category'>
              Asian
            </li>
            <li onClick={() => navigate('/beverages')} className='category'>
              Beverages
            </li>
            <li
              onClick={() => {
                navigate('/breakfast');
                setOpen(false);
              }}
              className='category'
            >
              Breakfast
            </li>
            <li
              onClick={() => {
                navigate('/desserts');
                setOpen(false);
              }}
              className='category'
            >
              Desserts
            </li>
            <li
              onClick={() => {
                navigate('/gluten');
                setOpen(false);
              }}
              className='category'
            >
              Gluten-Free
            </li>
            <li
              onClick={() => {
                navigate('/breakfast');
                setOpen(false);
              }}
              className='category'
            >
              Breakfast
            </li>
            <li
              onClick={() => {
                navigate('/desserts');
                setOpen(false);
              }}
              className='category'
            >
              Desserts
            </li>
            <li
              onClick={() => {
                navigate('/gluten');
                setOpen(false);
              }}
              className='category'
            >
              Gluten-Free
            </li>
            <li
              onClick={() => {
                navigate('/asian');
                setOpen(false);
              }}
              className='category'
            >
              Asian
            </li>
            <li
              onClick={() => {
                navigate('/beverages');
                setOpen(false);
              }}
              className='category'
            >
              Beverages
            </li>
            <li
              onClick={() => {
                navigate('/breakfast');
                setOpen(false);
              }}
              className='category'
            >
              Breakfast
            </li>
            <li
              onClick={() => {
                navigate('/desserts');
                setOpen(false);
              }}
              className='category'
            >
              Desserts
            </li>
            <li
              onClick={() => {
                navigate('/gluten');
                setOpen(false);
              }}
              className='category'
            >
              Gluten-Free
            </li>
            <li
              onClick={() => {
                navigate('/breakfast');
                setOpen(false);
              }}
              className='category'
            >
              Breakfast
            </li>
            <li
              onClick={() => {
                navigate('/desserts');
                setOpen(false);
              }}
              className='category'
            >
              Desserts
            </li>
            <li
              onClick={() => {
                navigate('/gluten');
                setOpen(false);
              }}
              className='category'
            >
              Gluten-Free
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
