import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  // getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db, auth } from '../firebase.config';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Section from '../components/shared/Section';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (auth.currentUser !== null) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Section>
      <div className='authentication-container'>
        <header className='bg-white z-0'>
          <p className='authentication-heading'>Create Account</p>
        </header>

        <main>
          <form onSubmit={onsubmit} className='flex flex-col space-y-5'>
            <div className='relative w-full xs:max-w-max'>
              <FaUserAlt className='authentication-icon' />
              <input
                type='text'
                placeholder='Name'
                id='name'
                value={name}
                onChange={onchange}
                required
                className='authentication-input'
              />
            </div>

            <div className='relative w-full xs:max-w-max'>
              <FaUserAlt className='authentication-icon' />
              <input
                type='email'
                placeholder='Email'
                id='email'
                value={email}
                onChange={onchange}
                required
                className='authentication-input'
              />
            </div>

            <div className='relative w-full xs:max-w-max'>
              <FaLock className='absolute left-3 top-4 z-10' />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                id='password'
                value={password}
                onChange={onchange}
                required
                className='authentication-input'
              />
              {showPassword ? (
                <MdVisibilityOff
                  className='absolute top-4 right-2 text-xl cursor-pointer hover:text-slate-500'
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <MdVisibility
                  className='absolute top-4 right-2 text-xl cursor-pointer hover:text-slate-500'
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <div className='py-8 flex flex-col items-center space-y-3 xs:flex-row-reverse xs:justify-between xs:items-center xs:space-y-0'>
              <button className='px-3 py-1 font-bold rounded-md transition duration-200 text-slate-600 hover:text-slate-200 group hover:bg-recipease-100'>
                Log In
                <FiArrowRight className='text-slate-800 group-hover:text-slate-200 inline pl-1 text-xl' />
              </button>
              <Link to='/forgot-password' className='authentication-link'>
                Forgot Password?
              </Link>
            </div>
          </form>

          {/* Google OAuth */}

          <p className='mt-8 text-right text-slate-600'>
            Already have an account?
          </p>
          <Link to='/sign-in' className='authentication-link block text-right'>
            Sign in
          </Link>
        </main>
      </div>
    </Section>
  );
};
export default SignUp;
