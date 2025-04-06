import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Mic, X, Volume2 } from "lucide-react";
import { toast } from "react-hot-toast";

const VoiceAgent = ({ onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [hasPermission, setHasPermission] = useState(null); // null = not asked yet
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  // Check for microphone permission when component mounts
  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      // This will trigger the permission prompt if not already granted
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately stop the stream since we just wanted to check permission
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
    } catch (error) {
      console.error("Microphone permission denied:", error);
      setHasPermission(false);
      toast.error("Microphone access is required for voice agent.");
    }
  };

  const recordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => audioChunks.current.push(event.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/wav" });
        setAudioBlob(blob);
        handleSend(blob);
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

  const handleSend = async (blob) => {
    const formData = new FormData();
    formData.append("audio_file", blob, "voice.wav");

    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/chatvoice/",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.file_path) {
        const audioUrl = `http://127.0.0.1:8000/${response.data.file_path}`;
        const audio = new Audio(audioUrl);
        audio.play();
        toast.success("Playing the response.");
        
        audio.onended = recordAudio; // Restart recording after response ends
      } else {
        toast.error("No audio response received.");
        recordAudio();
      }
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error("Failed to get response.");
      recordAudio();
    }
  };

  // Render permission request if not granted yet
  if (hasPermission === false) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
        <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Microphone Access Required</h2>
          <p className="text-gray-600 mb-6">
            The voice agent needs microphone permission to work. Please allow microphone access in your browser settings.
          </p>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Close
            </button>
            <button
              onClick={checkMicrophonePermission}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render loading state while checking permission
  if (hasPermission === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
        <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Checking Microphone Access</h2>
          <p className="text-gray-600 mb-6">Please allow microphone access when prompted...</p>
        </div>
      </div>
    );
  }

  // Render the main interface if permission is granted
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