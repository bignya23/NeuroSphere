// VoiceAgent.jsx
import { useState, useEffect } from "react";
import { Mic, X } from "lucide-react";
import { toast } from "react-hot-toast";

const VoiceAgent = ({ onTranscribe }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Voice recognition not supported in this browser.");
      return;
    }

    const speechRecognition = new window.webkitSpeechRecognition();
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.lang = "en-US";

    speechRecognition.onstart = () => setIsRecording(true);
    speechRecognition.onend = () => setIsRecording(false);
    speechRecognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      toast.error("Error in voice recognition.");
      setIsRecording(false);
    };

    speechRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscribe(transcript);
    };

    setRecognition(speechRecognition);
  }, [onTranscribe]);

  const handleStartRecording = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const handleStopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h2 className="text-xl font-semibold">Voice Agent</h2>
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`p-3  rounded-full transition ${isRecording ? "bg-red-500" : "bg-blue-500"} text-white hover:opacity-75`}
      >
        {isRecording ? <X className="w-6 h-6" /> : <Mic className="w-8 h-8" />}
      </button>
      <p>{isRecording ? "Listening..." : "Click to speak"}</p>
    </div>
  );
};

export default VoiceAgent;
