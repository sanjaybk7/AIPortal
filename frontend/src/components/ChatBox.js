import React, { useState } from "react";
import axios from "axios";

function ChatBox() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChat = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("query", query);
    const res = await axios.post("http://localhost:8000/chat/", formData);
    setAnswer(res.data.answer);
  };

  return (
    <div>
      <form onSubmit={handleChat}>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ask a question..." />
        <button type="submit">Ask</button>
      </form>
      {answer && <div><b>Answer:</b> {answer}</div>}
    </div>
  );
}

export default ChatBox;
