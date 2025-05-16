import React, { useState } from "react";
import axios from "axios";

function SummarizeForm() {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("Summarize this document:");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", prompt);
    const res = await axios.post("http://localhost:8000/summarize/", formData);
    setSummary(res.data.summary);
    setLoading(false);
  };

  return (
    <div>
      <h3>Summarize a Document</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <br />
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          style={{ width: "60%" }}
        />
        <br />
        <button type="submit" disabled={loading || !file}>
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </form>
      {summary && (
        <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "10px" }}>
          <b>Summary:</b>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default SummarizeForm;
