// src/components/AuthWrapper.jsx
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthWrapper = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    // Delay just a little to ensure DOM/localStorage fully available
    const delay = setTimeout(() => {
      setUserEmail(email);
      setLoading(false);
    }, 100); // delay helps especially on new tab loads

    return () => clearTimeout(delay);
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <AuthContext.Provider value={{ userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
