import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';
// import firebase from 'firebase/compat/app';

type FormType = {
  name: string;
  email: string;
};

type ContextType = {
  loggedIn: boolean;
  checkingStatus: boolean;
  user: FormType;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<ContextType | null>(null);

const AuthProvider = ({ children }: ProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [user, setUser] = useState<FormType>({
    name: '',
    email: '',
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName && user?.email) {
        console.log('Logged In');
        setUser({
          name: user.displayName,
          email: user.email,
        });
        setLoggedIn(true);
      } else {
        console.log('Logged Out');
        setLoggedIn(false);
      }
      setCheckingStatus(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, checkingStatus, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
