import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  const disease = user?.disease;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!disease) {
      setError("Unable to access chat room. Please contact support.");
      return;
    }

    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/chat/history/${disease}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        setError("Error loading chat history");
        console.error("Error:", error);
      }
    };

    let ws;
    const connectWebSocket = () => {
      if (socket) return; // ✅ Prevent multiple WebSocket connections

      ws = new WebSocket(`ws://localhost:8000/ws/chat/${disease}/`);

      ws.onopen = () => {
        console.log(`Connected to ${disease} chat room`);
        setError("");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [
          ...prev,
          {
            content: data.message,
            sender_email: data.sender_email,
            timestamp: new Date().toISOString(),
          },
        ]);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError("Connection error. Please try again later.");
      };

      ws.onclose = () => {
        setError("Connection closed. Reconnecting...");
        setTimeout(connectWebSocket, 3000);
      };

      setSocket(ws);
    };

    connectWebSocket();
    fetchChatHistory();

    return () => {
      if (ws) ws.close(); // ✅ Proper WebSocket cleanup
    };
  }, [disease, token]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          message: newMessage,
          user_id: user.id,
        })
      );
      setNewMessage("");
    } else {
      setError("Connection lost. Please refresh the page.");
    }
  };

  if (!disease) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">Unable to determine your support group.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Chat Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg text-center text-lg font-semibold">
        {disease} Support Group Chat
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender_email === user.email ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                message.sender_email === user.email ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              <div className="text-sm font-semibold">{message.sender_email}</div>
              <div>{message.content}</div>
              <div className="text-xs mt-1 opacity-70">{new Date(message.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={!socket || socket.readyState !== WebSocket.OPEN}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
