import { useState } from "react";
import { Mic, X, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

const VoiceAgent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [responseAudio, setResponseAudio] = useState(null);
  let mediaRecorder;
  const audioChunks = [];

  const recordAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        toast.success("Audio recorded successfully.");
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started. Speak now.");

      setTimeout(() => {
        mediaRecorder.stop();
        setIsRecording(false);
      }, 5000); 
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Failed to access microphone.");
    }
  };
  const handleSend = async () => {
    if (!audioBlob) {
      toast.error("No audio recorded.");
      return;
    }
  
    if (!(audioBlob instanceof Blob)) {
      console.error("Invalid audioBlob:", audioBlob);
      toast.error("Audio data is not valid.");
      return;
    }
  
    const formData = new FormData();
    formData.append("audio_file", audioBlob, "voice.wav");
  
    try {
      console.log("Sending audio to backend...");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/chatvoice/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      if (response.data.file_path) {
        const audio = new Audio(response.data.file_path);
        audio.play();
        toast.success("Response received and played.");
      } else {
        toast.error("No audio response received.");
      }
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error("Failed to get response.");
    }
  };
  

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h2 className="text-xl font-semibold">Voice Agent</h2>

     
      <button
        onClick={isRecording ? () => mediaRecorder.stop() : recordAudio}
        className={`p-3 rounded-full transition ${
          isRecording ? "bg-red-500" : "bg-blue-500"
        } text-white hover:opacity-75`}
      >
        {isRecording ? <X className="w-6 h-6" /> : <Mic className="w-8 h-8" />}
      </button>

 
      <button
        onClick={handleSend}
        className="p-3 bg-green-500 text-white rounded-full hover:opacity-75"
      >
        <Send className="w-6 h-6" />
      </button>

      <p>{isRecording ? "Recording..." : "Click to start recording"}</p>
    </div>
  );
};

export default VoiceAgent;
