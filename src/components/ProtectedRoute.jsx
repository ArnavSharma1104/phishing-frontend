import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthWrapper";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { userEmail, loading } = useContext(AuthContext);

  console.log("🔒 ProtectedRoute:", { userEmail, loading });

  if (loading) {
    return <div className="text-center mt-10">Loading Protected Route...</div>;
  }

  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userEmail.toLowerCase() !== "arnav@gmail.com") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
