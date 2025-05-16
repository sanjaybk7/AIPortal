import React, { useState } from "react";
import axios from "axios";

function TranscribeForm() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://localhost:8000/transcribe/", formData);
    setTranscript(res.data.transcript);
    setLoading(false);
  };

  return (
    <div>
      <h3>Transcribe Audio or Video File</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*,video/*" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" disabled={loading || !file}>
          {loading ? "Transcribing..." : "Transcribe"}
        </button>
      </form>
      {transcript && (
        <div style={{ marginTop: "20px", background: "#f5f5f5", padding: "10px" }}>
          <b>Transcript:</b>
          <p style={{ whiteSpace: "pre-wrap" }}>{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default TranscribeForm;
