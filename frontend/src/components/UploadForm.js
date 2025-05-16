import React, { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:8000/upload/", formData);
    setStatus("Uploaded and indexed!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Upload & Index</button>
      <p>{status}</p>
    </form>
  );
}

export default UploadForm;
