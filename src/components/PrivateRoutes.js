import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./context/context";

const PrivateRoutes = ({ children }) => {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoutes;
