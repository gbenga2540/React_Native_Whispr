import React, { useEffect, useState } from 'react';
import { AuthContext, IAuthProvider } from './interfaces';
import { useAuthStore } from 'src/store/auth/auth.store';

export const AuthProvider: IAuthProvider = function AuthProvider({ children }) {
  const authStat = useAuthStore().auth;

  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    setAuth(authStat);
  }, [authStat]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
