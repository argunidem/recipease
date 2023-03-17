import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import { AuthContext } from '../context/auth/AuthContext';
import { toast } from 'react-toastify';
import Section from '../components/shared/Section';

type FormType = {
  name: string;
  email: string;
};

const Profile = () => {
  const context = useContext(AuthContext);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState<FormType>({
    name: '',
    email: '',
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: context?.user.name || '',
      email: context?.user.email || '',
    });
  }, [context]);

  if (!context?.user.name && !context?.user.email) {
    return (
      <p className='absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2'>
        Loading user information...
      </p>
    );
  }

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser && context?.user.name !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Section>
      <header className='bg-white z-0 sm:mx-12'>
        <p className='heading'>My Profile</p>
        <button
          type='button'
          onClick={onLogout}
          className='hidden xs:inline authentication-link'
        >
          Logout
        </button>
      </header>

      <main className='container'>
        <div className='flex flex-col space-y-8 xs:flex-row xs:space-y-0 xs:justify-between items-center space-x-4 sm:space-x-36 mb-4'>
          <p className='text-recipease-100 font-semibold text-center xs:text-left sm:text-2xl'>
            Personal Details
          </p>
          <p
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
            className='btn btn-sm text-white hover:btn-warning'
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div>
          <form className='form'>
            <input
              type='text'
              id='name'
              className={`px-3 xs:px-4 rounded-md authentication-input ${
                !changeDetails && 'disabled:bg-white'
              }`}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={`px-3 xs:px-4 rounded-md authentication-input ${
                !changeDetails && 'disabled:bg-white'
              }`}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </Section>
  );
};
export default Profile;
