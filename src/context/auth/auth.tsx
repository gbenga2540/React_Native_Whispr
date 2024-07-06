import React, { useState } from 'react';
import { AuthContext, IAuthProvider } from './interfaces';

export const AuthProvider: IAuthProvider = function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
