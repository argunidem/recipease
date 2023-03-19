import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.config';

type UserType = {
  id: string;
  username: string | null;
};

type ContextType = {
  loggedIn: boolean;
  checkingStatus: boolean;
  user: UserType | null;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext<ContextType | null>(null);

const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<null | UserType>(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged In');
        setUser({
          id: user.uid,
          username: user.displayName,
        });
        setLoggedIn(true);
      } else {
        console.log('Logged Out');
        setLoggedIn(false);
      }
      setCheckingStatus(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loggedIn, checkingStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
