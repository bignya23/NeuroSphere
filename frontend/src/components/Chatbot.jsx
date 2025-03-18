import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Bot, Mic, X } from "lucide-react";
import { User } from 'lucide-react';
import { toast } from "react-hot-toast";
import VoiceAgent from "./VoiceAgent";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    console.log(input)
    setInput("");
    setIsTyping(true);

    try {
      setTimeout(async () => {
        const aiResponse = await getAIResponse(input);
        setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get response");
      setIsTyping(false);
    }
  };

  const getAIResponse = async (userMessage) => {
    try {
       const token = localStorage.getItem("access_token");
      //  const user = localStorage.getItem("user");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/chatbot/",
        { query: userMessage},
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      console.log(response)
      return response.data.chatbot;
    } catch (error) {
      return "Sorry, I couldn't process that.";
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-[100%] border-4 border-blue-400 rounded-3xl shadow-xl bg-blue-50 relative overflow-hidden">
      {/* Header with cartoon robot */}
      <div className="flex items-center justify-center bg-blue-500 text-white py-4 rounded-t-2xl border-b-4 border-blue-400">
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-full mr-3 shadow-md">
            <Bot className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-xl font-bold tracking-wide">Buddy Bot</span>
        </div>
      </div>

      {/* Message container with fun background */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%234299e1' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E')",
          backgroundAttachment: "fixed"
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "ai" && (
              <div className="bg-white p-1 rounded-full h-8 w-8 flex items-center justify-center mr-2 shadow-md">
                <Bot className="w-5 h-5 text-blue-500" />
              </div>
            )}
            <div 
              className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md ${
                msg.sender === "user" 
                  ? "bg-blue-500 text-white rounded-br-none shadow-md" 
                  : "bg-white text-blue-900 rounded-bl-none shadow-md border-2 border-blue-200"
              }`}
            >
              <p className="text-md leading-relaxed">{msg.text}</p>
            </div>
            {msg.sender === "user" && (
              <div className="bg-blue-600 p-1 rounded-full h-8 w-8 flex items-center justify-center ml-2 shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-1 rounded-full h-8 w-8 flex items-center justify-center mr-2 shadow-md">
              <Bot className="w-5 h-5 text-blue-500" />
            </div>
            <div className="bg-white text-blue-900 px-4 py-3 rounded-2xl rounded-bl-none max-w-xs shadow-md border-2 border-blue-200">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Rounded, friendly input area */}
      <div className="p-4 border-t-4 border-blue-400 bg-blue-100">
        <div className="flex items-center bg-white rounded-full p-2 shadow-md">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to Buddy Bot..."
            className="flex-1 border-none outline-none px-4 py-2 rounded-full bg-transparent text-blue-900"
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button 
            onClick={() => setShowVoiceAgent(true)} 
            className="mx-1 bg-blue-100 text-blue-500 p-3 rounded-full hover:bg-blue-200 transition"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button 
            onClick={sendMessage} 
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showVoiceAgent && (
        <div className="fixed inset-0 bg-blue-50 z-50 flex flex-col items-center justify-center rounded-3xl border-4 border-blue-400">
          <div className="absolute top-6 right-6">
            <button 
              onClick={() => setShowVoiceAgent(false)} 
              className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-center p-6">
            <div className="bg-white p-4 rounded-full inline-block mb-4 shadow-lg">
              <Mic className="w-16 h-16 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Let's Talk!</h2>
          </div>
          <VoiceAgent />
        </div>
      )}
    </div>
  );
};

export default Chatbot;