import React, { useState } from "react";
import axios from "axios";

function ExtractForm() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState("json");
  const [result, setResult] = useState("");
  const [excelLink, setExcelLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("output_format", format);

    if (format === "excel") {
      const res = await axios.post("http://localhost:8000/extract/", formData, { responseType: "blob" });
      // Create a download link for the Excel file
      const url = window.URL.createObjectURL(new Blob([res.data]));
      setExcelLink(url);
      setResult("");
    } else {
      const res = await axios.post("http://localhost:8000/extract/", formData);
      setResult(JSON.stringify(res.data, null, 2));
      setExcelLink("");
    }
    setLoading(false);
  };

  return (
    <div>
      <h3>Extract Tables/Key-Values from Document</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <label>
          Output as:
          <select value={format} onChange={e => setFormat(e.target.value)}>
            <option value="json">JSON</option>
            <option value="excel">Excel</option>
          </select>
        </label>
        <button type="submit" disabled={loading || !file}>
          {loading ? "Extracting..." : "Extract"}
        </button>
      </form>
      {result && (
        <pre style={{ marginTop: "20px", background: "#f5f5f5", padding: "10px" }}>
          {result}
        </pre>
      )}
      {excelLink && (
        <a href={excelLink} download="extracted_tables.xlsx" style={{ marginTop: "20px", display: "block" }}>
          Download Extracted Tables (Excel)
        </a>
      )}
    </div>
  );
}

export default ExtractForm;
