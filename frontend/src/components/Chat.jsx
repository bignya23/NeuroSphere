import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  
  const user = JSON.parse(localStorage.getItem("user")) // Dummy user for frontend-only demo
  const disease = "General Support"; // Dummy chat room name

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        content: newMessage,
        sender_email: user.email,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg text-center text-xl font-bold">
        {disease} Support Group Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender_email === user.email ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs md:max-w-md p-4 rounded-xl text-white shadow-lg ${
                msg.sender_email === user.email ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              <p className="font-semibold">{user.name}</p>
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-80">{new Date(msg.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;