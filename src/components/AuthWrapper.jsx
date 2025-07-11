import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthWrapper = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    console.log("📦 AuthWrapper: userEmail =", email);
    if (email) {
      setUserEmail(email);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail, loading }}>
      {loading ? (
        <div className="text-center mt-10">Loading auth...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
