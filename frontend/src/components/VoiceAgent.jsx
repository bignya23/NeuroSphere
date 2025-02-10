import { useState, useRef } from "react";
import axios from "axios";
import { Mic, Play, Loader } from "lucide-react";
import { toast } from "react-hot-toast";

const VoiceAgent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const silenceTimerRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      if (!streamRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
      }
      audioChunksRef.current = [];
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = sendAudioToServer;
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsMicActive(true);
      detectSilence(streamRef.current);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to start recording");
    }
  };

  const detectSilence = (stream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.fftSize = 512;
    const dataArray = new Uint8Array(analyser.fftSize);

    const checkSilence = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;

      if (average < 5) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          stopRecording();
        }, 5000);
      } else {
        clearTimeout(silenceTimerRef.current);
      }

      if (isRecording) {
        requestAnimationFrame(checkSilence);
      }
    };

    checkSilence();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsMicActive(false);
      clearTimeout(silenceTimerRef.current);
    }
  };

  const sendAudioToServer = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioBlob, "voice-recording.wav");

    try {
      setIsLoading(true);
      const response = await axios.post("https://dummy-backend.com/upload_audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.audioUrl) {
        setAudioUrl(response.data.audioUrl);
      }
      toast.success("Response received!");
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error("Failed to send audio");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {/* Dummy Mic Agent Image */}
      <img
        src="https://dummyimage.com/150x150/000/fff.png&text=Mic+Agent"
        alt="Mic Agent"
        className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg"
      />

      {/* Mic Button */}
      <div className="flex gap-4 items-center">
        <Mic
          onClick={startRecording}
          className={`w-16 h-16 cursor-pointer transition-all duration-200 ${
            isMicActive ? "text-red-500 scale-110" : "text-primary"
          }`}
        />
        {isLoading && <Loader className="w-8 h-8 animate-spin text-blue-500" />}
      </div>

      {/* Play Response Audio */}
      {audioUrl && (
        <button
          onClick={() => audioRef.current.play()}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        >
          <Play className="w-5 h-5" /> Play Response
        </button>
      )}

      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};

export default VoiceAgent;
