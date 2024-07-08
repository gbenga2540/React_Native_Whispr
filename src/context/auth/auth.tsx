import React, { useEffect, useState } from 'react';
import { AuthContext, IAuthProvider } from './interfaces';

export const AuthProvider: IAuthProvider = function AuthProvider({ children }) {
  const [render, setRender] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}>
      {render ? children : null}
    </AuthContext.Provider>
  );
};
