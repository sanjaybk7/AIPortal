import React from "react";
import UploadForm from "./components/UploadForm";
import ChatBox from "./components/ChatBox";
import SummarizeForm from "./components/SummarizeForm";
import TranscribeForm from "./components/TranscribeForm";
import TranslateForm from "./components/TranslateForm";
import ExtractForm from "./components/ExtractForm";

function App() {
  return (
    <div>
      <h2>AI Portal: Chat, Summarize, Transcribe, Translate, and Extract</h2>
      <UploadForm />
      <ChatBox />
      <hr />
      <SummarizeForm />
      <hr />
      <TranscribeForm />
      <hr />
      <TranslateForm />
      <hr />
      <ExtractForm />
    </div>
  );
}

export default App;
