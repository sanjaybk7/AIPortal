import React from "react";
import UploadForm from "./components/UploadForm";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div>
      <h2>AI Portal: Chat with Your Data</h2>
      <UploadForm />
      <ChatBox />
    </div>
  );
}

export default App;
