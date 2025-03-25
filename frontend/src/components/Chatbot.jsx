import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Bot, Mic, X, User } from "lucide-react";
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
    setInput("");
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(input);
      setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Failed to get response");
      setIsTyping(false);
    }
  };

  const getAIResponse = async (userMessage) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/chatbot/",
        { query: userMessage },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      return JSON.parse(response.data.chatbot).chatbot_output;
    } catch (error) {
      return "Sorry, I couldn't process that.";
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-[100%] border-4 border-blue-400 rounded-3xl shadow-xl bg-blue-50 relative overflow-hidden">
      <div className="flex items-center justify-center bg-blue-500 text-white py-4 rounded-t-2xl border-b-4 border-blue-400">
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-full mr-3 shadow-md">
            <Bot className="w-6 h-6 text-blue-500" />
          </div>
          <span className="text-xl font-bold tracking-wide">Buddy Bot</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

      {showVoiceAgent && <VoiceAgent onClose={() => setShowVoiceAgent(false)} />}
    </div>
  );
};

export default Chatbot;
