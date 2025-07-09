import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function AdminPanel() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [fakeLogins, setFakeLogins] = useState([]);


  useEffect(() => {
    fetch("https://phishing-backend-3.onrender.com/api/activity/logs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Logs:", data)
        setLogs(data.reverse()); // Show latest first
      })
      .catch((err) => {
        console.error("❌ Failed to fetch logs:", err);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLogs = logs.filter((log) =>
    log.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //export fake login
  const exportFakeLoginsToCSV = () => {
  const headers = ["Email", "Password", "Clicked From", "Timestamp"];
  const rows = fakeLogins.map((log) => [
    log.email,
    log.password,
    log.clickedFrom || "Unknown",
    new Date(log.timestamp).toLocaleString(),
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "fake_logins.csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
};


  const deleteLog = async (id) => {
  try {
    const res = await fetch(`https://phishing-backend-3.onrender.com/api/activity/logs/${id}`, {
      method: "DELETE", // ✅ Yeh zaroori hai
    });
    if (res.ok) {
      setLogs(logs.filter((log) => log._id !== id));
    } else {
      console.error("❌ Server responded with:", res.status);
    }
  } catch (error) {
    console.error("❌ Error deleting log:", error);
  }
};


  const exportToCSV = () => {
  const headers = ["Email", "Action", "Timestamp"];
  const rows = logs.map((log) => [
    log.email,
    log.action,
    new Date(log.timestamp).toLocaleString(),
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "employee_logs.csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
};
const navigate = useNavigate();

useEffect(() => {
    fetch("https://phishing-backend-3.onrender.com/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("❌ Failed to fetch templates:", err));
  }, []);

useEffect(() => {
  fetch("https://phishing-backend-3.onrender.com/api/fake-login")
    .then((res) => res.json())
    .then((data) => setFakeLogins(data))
    .catch((err) => console.error("❌ Failed to fetch fake login data:", err));
}, []);

  const sendEmail = async () => {
    if (!targetEmail || !selectedTemplateId) {
      setStatusMessage("❌ Please fill all fields.");
      return;
    }

    try {
      const res = await fetch("https://phishing-backend-3.onrender.com/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: targetEmail,
          templateId: selectedTemplateId,
        }),
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



  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        📊 Employee Activity Logs
      </h1>
      <div className="bg-white p-6 mb-6 shadow-md rounded-md max-w-xl mx-auto">
  <h2 className="text-xl font-semibold mb-4 text-gray-700">🎯 Send Phishing Email</h2>

  <input
    type="email"
    placeholder="Enter target employee email"
    value={targetEmail}
    onChange={(e) => setTargetEmail(e.target.value)}
    className="w-full p-2 mb-4 border rounded"
  />

  <select
    value={selectedTemplateId}
    onChange={(e) => setSelectedTemplateId(e.target.value)}
    className="w-full p-2 mb-4 border rounded"
  >
    <option value="">Select an email template</option>
    {templates.map((tpl) => (
      <option key={tpl._id} value={tpl._id}>
        {tpl.subject}
      </option>
    ))}
  </select>

  <button
    onClick={sendEmail}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    📤 Send Email
  </button>

  {statusMessage && (
    <p className="mt-4 text-sm text-center text-gray-600">{statusMessage}</p>
  )}
</div>


      <div className="flex justify-end mb-4 max-w-7xl mx-auto">
  <button
    onClick={exportToCSV}
    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
  >
    ⬇️ Export to CSV
  </button>
  <button
    onClick={() => navigate("/templates")}
    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
  >
    ➕ Create Email Template
  </button>
  <button
  onClick={exportFakeLoginsToCSV}
  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
>
  ⬇️ Export Fake Logins
</button>


</div>


      <div className="mb-4 max-w-md mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left">📧 Email</th>
              <th className="px-4 py-3 text-left">📝 Action</th>
              <th className="px-4 py-3 text-left">⏰ Timestamp</th>
              <th className="px-4 py-3 text-left">🗑️ Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.map((log, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{log.email}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteLog(log._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    <h2 className="text-xl font-semibold mt-10 mb-4 text-red-700">🛑 Fake Login Attempts</h2>

<div className="overflow-x-auto bg-white shadow-lg rounded-lg mb-10">
  <table className="min-w-full divide-y divide-gray-200 text-sm">
    <thead className="bg-red-100">
      <tr>
        <th className="px-4 py-3 text-left">📧 Email</th>
        <th className="px-4 py-3 text-left">🔐 Password</th>
        <th className="px-4 py-3 text-left">⏰ Timestamp</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {fakeLogins.map((entry, index) => (
        <tr key={index}>
          <td className="px-4 py-2">{entry.email}</td>
          <td className="px-4 py-2">{entry.password}</td>
          <td className="px-4 py-2">
            {new Date(entry.timestamp).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div className="mt-12">
  <h2 className="text-xl font-semibold mb-4 text-center text-red-600">
    🕵️ Captured Fake Login Attempts
  </h2>

  <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      <thead className="bg-red-100">
        <tr>
          <th className="px-4 py-3 text-left">📧 Email Entered</th>
          <th className="px-4 py-3 text-left">🔑 Password</th>
          <th className="px-4 py-3 text-left">📨 Link Sent To</th>
          <th className="px-4 py-3 text-left">⏰ Timestamp</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {fakeLogins.map((log, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{log.email}</td>
            <td className="px-4 py-2">{log.password}</td>
            <td className="px-4 py-2">{log.clickedFrom || "Unknown"}</td>
            <td className="px-4 py-2">
              {new Date(log.timestamp).toLocaleString()}
            </td>
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
