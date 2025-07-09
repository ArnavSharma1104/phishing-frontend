import React, { useEffect, useState } from "react";

function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    body: "",
    buttonText: "",
    redirectUrl: "",
  });

  // Fetch templates on load
  useEffect(() => {
    fetch("https://phishing-backend-3.onrender.com/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data))
      .catch((err) => console.error("❌ Error fetching templates:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://phishing-backend-3.onrender.com/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newTemplate = await res.json();
      setTemplates([newTemplate, ...templates]); // prepend
      setForm({ subject: "", body: "", buttonText: "", redirectUrl: "" });
    } catch (err) {
      console.error("❌ Failed to create template:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">📧 Create Fake Email Template</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-lg">
        <input
          type="text"
          name="subject"
          placeholder="Email Subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="body"
          placeholder="Email Body (HTML allowed)"
          value={form.body}
          onChange={handleChange}
          rows={4}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="buttonText"
          placeholder="Button Text"
          value={form.buttonText}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="redirectUrl"
          placeholder="Redirect URL"
          value={form.redirectUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Create Template
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📃 Saved Templates:</h3>
        {templates.map((tpl) => (
          <div key={tpl._id} className="bg-gray-100 p-4 rounded mb-4 shadow-sm">
            <p><strong>Subject:</strong> {tpl.subject}</p>
            <p><strong>Body:</strong> {tpl.body}</p>
            <p><strong>Button:</strong> {tpl.buttonText}</p>
            <p><strong>Redirect:</strong> {tpl.redirectUrl}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmailTemplates;
