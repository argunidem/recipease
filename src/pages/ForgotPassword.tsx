import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import Section from '../components/shared/Section';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  return (
    <Section>
      <header>
        <p className='heading mx-auto'>Forgot Password</p>
      </header>
      <div className='container'>
        <form onSubmit={onsubmit} className='form'>
          <div className='relative w-full xs:max-w-max'>
            <AiOutlineMail className='authentication-icon' />
            <input
              type='email'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onchange}
              required
              className='input-field'
            />
          </div>

          <button className='btn text-white hover:bg-slate-700'>
            Send Reset Link
            <BiRightArrowAlt className='ml-1 text-2xl' />
          </button>

          <Link
            className='btn bg-recipease-50 text-white hover:bg-blue-900'
            to='/sign-in'
          >
            <BiLeftArrowAlt className='mr-1 text-2xl' />
            Back to Sign In
          </Link>
        </form>
      </div>
    </Section>
  );
};
export default ForgotPassword;
