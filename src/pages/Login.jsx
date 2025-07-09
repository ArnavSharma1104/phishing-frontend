import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase"; // ✅ Correct path
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Store user email in localStorage + sessionStorage
    console.log("Saving user email:", user.email);
    localStorage.setItem("userEmail", user.email);
    console.log("localStorage set to:", localStorage.getItem("userEmail"));
    console.log("sessionStorage set to:", sessionStorage.getItem("userEmail"));

    // ✅ Redirect to dashboard
    navigate("/dashboard");
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
