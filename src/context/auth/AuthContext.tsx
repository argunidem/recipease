import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';

type ContextType = {
  loggedIn: boolean;
  checkingStatus: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<ContextType | null>(null);

const AuthProvider = ({ children }: ProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged In');
        setLoggedIn(true);
      } else {
        console.log('Logged Out');
        setLoggedIn(false);
      }
      setCheckingStatus(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ loggedIn, checkingStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
