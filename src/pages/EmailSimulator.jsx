import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmailSimulator() {
  const navigate = useNavigate();

  // 🧠 Handle click on phishing link
  const handleClick = () => {
    const email = localStorage.getItem("userEmail");

    // ✅ Log the click event to backend
    fetch("/api/activity/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        action: "Clicked Simulated Email Link",
      }),
    });

    // 🚀 Redirect to fake login page
    navigate("/fake-login");
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4 text-red-600">📧 Simulated Email</h2>
        <p className="mb-4">
          Hello user,<br />
          Your account password will expire in <strong>24 hours</strong>. To avoid being locked out,
          please click the link below to reset your password.
        </p>

        {/* 🔗 Fake phishing link */}
        <button
          onClick={handleClick}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Reset your password now
        </button>

        <p className="text-gray-400 mt-4 text-sm">
          This is a simulated phishing test for training purposes.
        </p>
      </div>
    </div>
  );
}

export default EmailSimulator;
