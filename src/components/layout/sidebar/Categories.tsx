import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { categories, categorySlugs } from '../../../categories';
import { BiCategory } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';

type CategoriesProps = {
  states: {
    open: boolean;
    setOpen: (open: boolean) => void;
    submenuOpen: boolean;
    setSubmenuOpen: (open: boolean) => void;
  };
};

const Categories = ({ states }: CategoriesProps) => {
  const { open, submenuOpen, setOpen, setSubmenuOpen } = states;

  return (
    <Fragment>
      <div
        onClick={() => {
          if (open) {
            setSubmenuOpen(!submenuOpen);
          } else if (!open) {
            setOpen(true);
            setSubmenuOpen(true);
          }
        }}
        className={`sidebar-item ${!open && 'justify-center'}`}
      >
        <span className='text-2xl'>
          <BiCategory />
        </span>
        <span className={`font-medium flex-1 ${!open && 'hidden'}`}>
          Categories
        </span>
        {open && (
          <BsChevronDown
            className={`mr-1 duration-300 ${submenuOpen && '-rotate-[180deg]'}`}
          />
        )}
      </div>
      <ul
        className={`h-0 overflow-auto transition-all duration-300 ${
          open && submenuOpen && 'h-44'
        }`}
      >
        {categories.map((category, index) => (
          <li key={index} className='category'>
            <Link
              to={`/${categorySlugs[index]}`}
              onClick={() => setOpen(false)}
              className='block py-1 pl-2'
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
export default Categories;
