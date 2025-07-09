import React, { useState } from "react";

function CreateTemplate() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://phishing-backend-3.onrender.com/api/templates/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, subject, body }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Template Created!");
      setTitle("");
      setSubject("");
      setBody("");
    } else {
      alert("❌ Error: " + data.error);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">✍️ Create Phishing Email Template</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Template Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Email Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Email Body (you can include a fake login link here)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded h-40"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Template
        </button>
      </form>
    </div>
  );
}

export default CreateTemplate;
