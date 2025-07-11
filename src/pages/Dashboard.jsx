import React, { useContext } from "react";
import { AuthContext } from "../components/AuthWrapper";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { userEmail, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Show loading screen while Firebase is checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600">
        🔄 Loading dashboard...
      </div>
    );
  }

  // Fallback check in case context is not populated correctly
  if (!userEmail) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold text-lg">
        ⛔ Unauthorized. Please login.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-4">📁 Dashboard</h1>
      <p className="text-lg mb-2">Welcome, <span className="font-semibold">{userEmail}</span>!</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => navigate("/admin")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md"
        >
          🔐 Go to Admin Panel
        </button>
        <button
          onClick={() => navigate("/email-sim")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md"
        >
          ✉️ Try Email Simulator
        </button>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
