import React from 'react';
import { createContext, useState } from 'react';

// export const AppContext = createContext(false);

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem('user');
  const [user, setUser] = useState(userToken);

  const login = (token) => {
    setUser(token);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
