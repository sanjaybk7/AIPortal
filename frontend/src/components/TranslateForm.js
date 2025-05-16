import React, { useState } from "react";
import axios from "axios";

function TranslateForm() {
  const [file, setFile] = useState(null);
  const [toLanguage, setToLanguage] = useState("fr");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("to_language", toLanguage);
    const res = await axios.post("http://localhost:8000/translate/", formData);
    setTranslated(res.data.translated);
    setLoading(false);
  };

  return (
    <div>
      <h3>Translate a Document</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <br />
        <label>Translate to:</label>
        <select value={toLanguage} onChange={e => setToLanguage(e.target.value)}>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="zh-Hans">Chinese (Simplified)</option>
          {/* Add more as needed */}
        </select>
        <br />
        <button type="submit" disabled={loading || !file}>
          {loading ? "Translating..." : "Translate"}
        </button>
      </form>
      {translated && (
        <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "10px" }}>
          <b>Translation:</b>
          <p style={{ whiteSpace: "pre-wrap" }}>{translated}</p>
        </div>
      )}
    </div>
  );
}

export default TranslateForm;
