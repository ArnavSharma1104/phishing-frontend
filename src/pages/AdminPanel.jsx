// src/pages/AdminPanel.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthWrapper";

function AdminPanel() {
  const navigate = useNavigate();
  const { userEmail } = useContext(AuthContext);

  const [logs, setLogs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fakeLogins, setFakeLogins] = useState([]);

  const roles = {
    "arnav@gmail.com": "Admin",
    "manager@example.com": "Manager",
    "viewer@example.com": "Viewer",
  };

  const userRole = roles[userEmail] || "Unknown";

  const fetchLogs = () => {
    fetch("https://phishing-backend-3.onrender.com/api/activity/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data.reverse()))
      .catch((err) => console.error("❌ Failed to fetch logs:", err));
  };

  const fetchTemplates = () => {
    fetch("https://phishing-backend-3.onrender.com/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("❌ Failed to fetch templates:", err));
  };

  const fetchFakeLogins = () => {
    fetch("https://phishing-backend-3.onrender.com/api/fake-login")
      .then((res) => res.json())
      .then((data) => setFakeLogins(data))
      .catch((err) => console.error("❌ Failed to fetch fake login data:", err));
  };

  useEffect(() => {
    fetchLogs();
    fetchTemplates();
    fetchFakeLogins();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLogs = logs.filter((log) =>
    log.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendEmail = async () => {
    if (!targetEmail || !selectedTemplateId) {
      setStatusMessage("❌ Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("https://phishing-backend-3.onrender.com/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: targetEmail, templateId: selectedTemplateId }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage("✅ Email sent successfully!");
        setTargetEmail("");
        setSelectedTemplateId("");
      } else {
        setStatusMessage("❌ Failed to send email: " + data.error);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setStatusMessage("❌ Error sending email.");
    }
  };

  const exportToCSV = () => {
    const headers = ["Email", "Action", "Timestamp"];
    const rows = logs.map((log) => [
      log.email,
      log.action,
      new Date(log.timestamp).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "employee_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFakeLoginsToCSV = () => {
    const headers = ["Email", "Password", "Clicked From", "Timestamp"];
    const rows = fakeLogins.map((log) => [
      log.email,
      log.password,
      log.clickedFrom || "Unknown",
      new Date(log.timestamp).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "fake_logins.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteLog = async (id) => {
    try {
      const res = await fetch(
        `https://phishing-backend-3.onrender.com/api/activity/logs/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) setLogs(logs.filter((log) => log._id !== id));
      else console.error("❌ Server responded with:", res.status);
    } catch (error) {
      console.error("❌ Error deleting log:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">🛡️ Admin Dashboard</h1>
          <p className="text-lg text-blue-200">Logged in as <strong>{userEmail}</strong> ({userRole})</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white text-black rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📤 Send Phishing Email</h2>
            <input
              type="email"
              placeholder="Target email"
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select a template</option>
              {templates.map((tpl) => (
                <option key={tpl._id} value={tpl._id}>{tpl.subject}</option>
              ))}
            </select>
            <button
              onClick={sendEmail}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >Send Email</button>
            {statusMessage && <p className="text-sm mt-2 text-center">{statusMessage}</p>}
          </div>

          <div className="bg-white text-black rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">📋 Log Actions</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by email"
                className="p-2 border rounded"
              />
              <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >⬇️ Export Activity Logs</button>
              <button
                onClick={exportFakeLoginsToCSV}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >⬇️ Export Fake Logins</button>
              <button
                onClick={() => navigate("/templates")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
              >➕ Create Email Template</button>
            </div>
          </div>
        </div>

        <div className="bg-white text-black rounded-lg shadow-lg p-4 mb-10 overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">📊 Activity Logs</h2>
          <table className="min-w-full text-sm">
            <thead className="bg-blue-200">
              <tr>
                <th className="p-2 text-left">📧 Email</th>
                <th className="p-2 text-left">📝 Action</th>
                <th className="p-2 text-left">⏰ Timestamp</th>
                <th className="p-2 text-left">🗑️ Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{log.email}</td>
                  <td className="p-2">{log.action}</td>
                  <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-2">
                    <button onClick={() => deleteLog(log._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white text-black rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">🕵️ Fake Login Attempts</h2>
          <table className="min-w-full text-sm">
            <thead className="bg-red-200">
              <tr>
                <th className="p-2 text-left">📧 Email</th>
                <th className="p-2 text-left">🔐 Password</th>
                <th className="p-2 text-left">📨 Clicked From</th>
                <th className="p-2 text-left">⏰ Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {fakeLogins.map((log, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{log.email}</td>
                  <td className="p-2">{log.password}</td>
                  <td className="p-2">{log.clickedFrom || "Unknown"}</td>
                  <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
