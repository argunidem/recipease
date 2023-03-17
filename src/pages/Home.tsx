import Section from '../components/shared/Section';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { auth } from '../firebase.config';

const Home = () => {
  const authContext = useContext(AuthContext);

  // console.log(authContext);
  return (
    <Section>
      <h1 className='text-2xl font-semibold'>
        {auth.currentUser?.displayName}
      </h1>
    </Section>
  );
};

export default Home;
