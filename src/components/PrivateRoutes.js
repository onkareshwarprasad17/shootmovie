import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './context/context';

const PrivateRoutes = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  console.log(auth.user);
  if (auth.user == null) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};

export default PrivateRoutes;
