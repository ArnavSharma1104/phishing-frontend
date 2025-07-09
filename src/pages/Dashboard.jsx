import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail")?.trim().toLowerCase();

  useEffect(() => {
    console.log("🧪 User Email from localStorage:", `"${userEmail}"`);

    fetch("https://phishing-backend-3.onrender.com/api/activity/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        action: "Visited Dashboard",
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log("✅ Log saved:", data))
      .catch((err) => console.error("❌ Log error:", err));
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to the Dashboard 🎯
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          This is your central hub for phishing awareness training.
        </p>

        {/* ✅ Admin Panel Button */}
        {userEmail === "arnav@gmail.com" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Go to Admin Panel
          </button>
        )}

        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mb-4">
          <p className="text-blue-800">
            ✅ Your visit has been logged and monitored securely.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
