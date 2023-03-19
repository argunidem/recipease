import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import Spinner from '../shared/Spinner';

const Private = () => {
  const context = useContext(AuthContext);

  if (context?.checkingStatus) {
    <Spinner />;
  }

  return context?.loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};
export default Private;
