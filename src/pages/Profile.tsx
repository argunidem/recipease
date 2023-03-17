import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import { toast } from 'react-toastify';
import Section from '../components/shared/Section';

type FormType = {
  name: string;
  email: string;
};

const Profile = () => {
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState<FormType>({
    name: '',
    email: '',
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: auth.currentUser?.displayName || '',
      email: auth.currentUser?.email || '',
    });
  }, [auth]);

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser && auth.currentUser.displayName !== name) {
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

      <div className='container'>
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
              className={`input-field px-3 xs:px-4 rounded-md ${
                !changeDetails && 'disabled:bg-white'
              }`}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={`input-field px-3 xs:px-4 rounded-md ${
                !changeDetails && 'disabled:bg-white'
              }`}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </div>
    </Section>
  );
};
export default Profile;
