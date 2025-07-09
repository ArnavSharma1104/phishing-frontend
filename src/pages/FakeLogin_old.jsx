import React, { useState } from "react";

function FakeLogin_old() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Log fake credential submission
    fetch("/api/activity/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        action: `Submitted fake credentials: ${password}`,
      }),
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-green-600 mb-4">This was a phishing simulation 🚨</h2>
          <p className="text-gray-700">
            You just entered your password on a suspicious page.<br />
            This demonstrates how phishing attacks work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-xl font-bold mb-6 text-blue-600">Microsoft Login</h2>

        <input
          type="email"
          placeholder="Email or phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Sign in
        </button>

        <p className="text-gray-400 text-xs mt-4">
          This page is a simulated phishing test for training purposes.
        </p>
      </form>
    </div>
  );
}

export default FakeLogin_old;
