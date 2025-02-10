import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Send, Bot, User } from "lucide-react";
import { toast } from "react-hot-toast";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
      // Simulating AI response delay
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
      // Replace with actual API request
      const response = await axios.post("https://dummy-backend.com/chatbot", {
        message: userMessage,
      });
      return response.data.reply;
    } catch (error) {
      return "Sorry, I couldn't process that.";
    }
  };

  return (
    <div className="flex flex-col h-[100vh] w-[100%] border rounded-lg shadow-lg bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-center bg-blue-600 text-white py-3 rounded-t-lg">
        <Bot className="mr-2" /> AI Chatbot
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-black px-4 py-2 rounded-lg max-w-xs">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="flex items-center border-t p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border-none outline-none px-3 py-2 rounded-lg bg-gray-100"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
