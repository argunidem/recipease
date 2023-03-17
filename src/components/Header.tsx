import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { BsPersonFillAdd, BsPersonCircle } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  return (
    <header>
      <section className='w-full mx-auto pl-3 pr-5 xs:pl-8 xs:pr-10 xl:w-5/6 max-w-8xl flex justify-between items-center'>
        <h1>Recipease</h1>
        {context?.checkingStatus ? (
          <span></span>
        ) : (
          <div className='flex items-center space-x-3'>
            <button
              className='mt-1 sm:btn sm:btn-ghost'
              onClick={() =>
                navigate(context?.loggedIn ? '/profile' : '/sign-in')
              }
            >
              {context?.loggedIn ? (
                <BsPersonCircle className='text-2xl sm:mr-2' />
              ) : (
                <FiLogIn className='text-2xl sm:mr-1' />
              )}
              <span className='hidden sm:inline'>
                {context?.loggedIn ? 'Profile' : 'Log In'}
              </span>
            </button>
            {!context?.loggedIn && (
              <button
                className='mt-1 sm:btn sm:btn-ghost'
                onClick={() => navigate('/sign-up')}
              >
                <BsPersonFillAdd className='text-2xl ml-2 sm:ml-0 sm:mr-1' />
                <span className='hidden sm:inline'>Sign Up</span>
              </button>
            )}
          </div>
        )}
      </section>
    </header>
  );
};
export default Header;
