import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const VapiWidget = ({ apiKey, assistantId }) => {
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => setIsConnected(true));
    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("speech-start", () => setIsSpeaking(true));
    vapiInstance.on("speech-end", () => setIsSpeaking(false));

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    });

    vapiInstance.on("error", (error) => console.error("Vapi error:", error));

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript]);

  const startCall = () => {
    if (vapi) {
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) vapi.stop();
    setTranscript([]);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {!isConnected ? (
        <div className="flex flex-col justify-center items-center h-full text-center p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Start Your Interview
          </h1>


          <button
            onClick={startCall}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all"
          >
            🎤 Start Interview
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  isSpeaking ? "bg-red-500 animate-pulse" : "bg-teal-600"
                }`}
              ></div>
              <span className="font-semibold text-gray-700">
                {isSpeaking ? "Assistant Speaking..." : "Listening..."}
              </span>
            </div>
            <button
              onClick={endCall}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded shadow-sm"
            >
              End Call
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
            {transcript.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Conversation will appear here...
              </p>
            ) : (
              transcript.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span
                    className={`px-4 py-2 rounded-2xl text-white max-w-[80%] text-sm ${
                      msg.role === "user" ? "bg-teal-600" : "bg-gray-700"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VapiWidget;
