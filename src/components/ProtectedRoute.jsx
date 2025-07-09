import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthWrapper";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userEmail } = useContext(AuthContext);

  if (userEmail === null) {
    return <div>Loading...</div>;
  }

  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userEmail !== "arnav@gmail.com") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
