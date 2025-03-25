import { useState, useRef } from "react";
import axios from "axios";
import { Send, Mic, X, Volume2 } from "lucide-react";
import { toast } from "react-hot-toast";

const VoiceAgent = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const recordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => audioChunks.current.push(event.data);

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        toast.success("Audio recorded successfully.");
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started. Speak now.");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Failed to access microphone.");
    }
  };

  const handleStop = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSend = async () => {
    if (!audioBlob) {
      toast.error("No audio recorded.");
      return;
    }

    const formData = new FormData();
    formData.append("audio_file", audioBlob, "voice.wav");

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/chatvoice/",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.file_path) {
        setAudioUrl(response.data.file_path);
        toast.success("Response received and ready to play.");
      } else {
        toast.error("No audio response received.");
      }
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error("Failed to get response.");
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      toast.success("Playing the response.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Voice Agent</h2>
        <p className="text-gray-600 mb-6">Click the mic to start recording your question.</p>

        <button
          onClick={isRecording ? handleStop : recordAudio}
          className={`p-4 rounded-full text-white ${isRecording ? "bg-red-500" : "bg-blue-500"}`}
        >
          {isRecording ? <X className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        {audioBlob && !audioUrl && (
          <button
            onClick={handleSend}
            className="p-4 bg-green-500 text-white rounded-full mt-4"
          >
            <Send className="w-8 h-8" />
          </button>
        )}

        {audioUrl && (
          <button
            onClick={playAudio}
            className="p-4 bg-blue-500 text-white rounded-full mt-4"
          >
            <Volume2 className="w-8 h-8" />
          </button>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-300 text-gray-700 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VoiceAgent;