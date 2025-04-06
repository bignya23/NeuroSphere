import React, { useState } from 'react';
import axios from "axios";
import { ArrowRight, ArrowDown } from 'lucide-react';

const MindMap = () => {
  // State for chatbot
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hello! I can help answer questions about your generated mind map. Ask me anything about the content or structure.", 
      sender: "bot" 
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  // State for mind map form
  const [textInput, setTextInput] = useState("");
  const [pdfInput, setPdfInput] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [mindMapData, setMindMapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to parse chatbot response
  const parseChatbotResponse = (response) => {
    try {
      const parsed = JSON.parse(response);
      if (parsed && parsed.content) {
        return parsed.content;
      }
      return response; // Return original if no content property
    } catch (e) {
      return response; // Return original if not JSON
    }
  };

  // Chatbot functions
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user"
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsBotTyping(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Determine what content to send - either text input or PDF extracted content
      const contentToSend = mindMapData ? 
        (pdfInput ? pdfInput : textInput) : 
        "No mind map content available";

      // Make API call to flowchart chatbot endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/flowchart_chatbot/",
        {
          query: inputMessage,
          content: contentToSend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Parse the chatbot response to extract content if available
      const responseText = parseChatbotResponse(response.data.chatbot_response);

      // Add bot response to chat
      const newBotMessage = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot"
      };
      setMessages(prev => [...prev, newBotMessage]);

    } catch (error) {
      console.error("Error calling flowchart chatbot:", error);
      
      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        text: error.response?.data?.message || "Sorry, I encountered an error. Please try again.",
        sender: "bot"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Common function to generate mind map from text
  const generateMindMapFromText = async (text, source = 'text') => {
    const token = localStorage.getItem("access_token");

    try {
      setIsGenerating(true);
      setError(null);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/generate_flowchart/", 
        { flowchart_content: text }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Parse the nested JSON string
      let parsedData;
      try {
        if (typeof response.data.flowchart === 'string') {
          parsedData = JSON.parse(response.data.flowchart);
        } else {
          parsedData = response.data;
        }
      } catch (parseError) {
        console.error("Error parsing flowchart JSON:", parseError);
        throw new Error("Failed to parse mind map data");
      }
      
      // Get the flowchart array
      const flowchartArray = parsedData.flowchart || [];
      
      if (!Array.isArray(flowchartArray)) {
        throw new Error("Invalid flowchart data format");
      }

      setMindMapData({
        title: source === 'text' ? textInput : "PDF Content",
        stages: flowchartArray.sort((a, b) => a.stage - b.stage) // Sort stages numerically
      });

      // Add success message to chatbot
      const botMessage = {
        id: messages.length + 1,
        text: `I've generated a mind map from your ${source === 'text' ? 'text input' : 'PDF document'}. Ask me anything about it!`,
        sender: "bot"
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      console.error("Error generating mind map:", err);
      setError(err.message || "Failed to generate mind map");
      
      // Add error message to chatbot
      const errorMessage = {
        id: messages.length + 1,
        text: `Failed to generate mind map: ${err.message}`,
        sender: "bot"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Mind map form functions
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    await generateMindMapFromText(textInput, 'text');
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) return;
    const token = localStorage.getItem("access_token");
    
    try {
      setIsGenerating(true);
      setError(null);
      
      const formData = new FormData();
      formData.append('pdf-file', pdfFile);  // Match the backend expected field name
      
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/flowchart_pdf/",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      // Handle the response based on backend output
      if (response.data.output === "Pages exceed limit") {
        setError("PDF file exceeds page limit (20 pages maximum)");
        return;
      }
      
      // If we get extracted text content
      if (response.data.output) {
        setPdfInput(response.data.output);
        await generateMindMapFromText(response.data.output, 'pdf');
      }
  
    } catch (err) {
      console.error("Error submitting PDF:", err);
      setError(err.message || "Failed to process PDF file");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetMindMap = () => {
    setMindMapData(null);
    setTextInput("");
    setPdfInput("");
    setPdfFile(null);
    setError(null);
  };

  // Render individual point box
  const renderPointBox = (point, index, isFirstInRow = false) => (
    <div 
      key={index} 
      className={`p-3 rounded-lg bg-green-100 border-2 border-green-500 shadow-sm ${isFirstInRow ? '' : 'mt-2'}`}
    >
      <p className="text-sm">{point}</p>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-800">
      {/* Main Content */}
      {!mindMapData ? (
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Mind Map Generator</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Text Input Form */}
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Generate from Text</h2>
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text to generate mind map (e.g., 'Competitive Programming Roadmap')..."
                className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isGenerating ? "Generating..." : "Generate Mind Map"}
              </button>
            </form>
          </div>

          {/* PDF Input Form */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Generate from PDF</h2>
            <form onSubmit={handlePdfSubmit} className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  {pdfFile ? (
                    <p className="text-green-600">{pdfFile.name}</p>
                  ) : (
                    <>
                      <p className="mb-2">Click to upload PDF</p>
                      <p className="text-sm text-gray-500">or drag and drop</p>
                    </>
                  )}
                </label>
              </div>
              <button
                type="submit"
                disabled={isGenerating || !pdfFile}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isGenerating ? "Generating..." : "Generate from PDF"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-full p-6">
          <div className="flex justify-between items-center mb-6 px-6">
            <h1 className="text-2xl font-bold">{mindMapData.title}</h1>
            <button
              onClick={resetMindMap}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Generator
            </button>
          </div>

          {/* Desktop Mind Map Flow Diagram - 3 in top row, 2 in bottom row */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full hidden md:block">
            <div className="w-full flex flex-col items-center">
              {/* Center Title Node */}
              <div className="w-48 h-20 rounded-full bg-blue-100 border-4 border-blue-500 flex items-center justify-center mb-8">
                <p className="text-lg font-semibold text-center px-2">{mindMapData.title}</p>
              </div>
              
              {mindMapData.stages.length > 0 && (
                <>
                  {/* Top Row - First 3 stages */}
                  <div className="flex justify-center items-start space-x-8 w-full mb-8">
                    {mindMapData.stages.slice(0, Math.min(3, mindMapData.stages.length)).map((stage, stageIndex) => (
                      <div key={stage.stage} className="flex flex-col items-center">
                        {/* Stage Header */}
                        <div className="w-full p-3 rounded-lg bg-blue-100 border-2 border-blue-500 mb-2 text-center">
                          <h3 className="font-bold">Stage {stage.stage}</h3>
                        </div>
                        
                        {/* Points with connecting lines */}
                        <div className="relative">
                          {stage.output?.map((point, pointIndex) => (
                            <React.Fragment key={pointIndex}>
                              {renderPointBox(point, pointIndex, pointIndex === 0)}
                              {pointIndex < stage.output.length - 1 && (
                                <div className="flex justify-center">
                                  <ArrowDown size={20} className="text-gray-500 my-1" />
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                        
                        {/* Right arrow between stages */}
                        {stageIndex < 2 && stageIndex < mindMapData.stages.slice(0, 3).length - 1 && (
                          <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2">
                            <ArrowRight size={24} className="text-blue-500" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Down arrow from last top stage to first bottom stage */}
                  {mindMapData.stages.length > 3 && (
                    <div className="h-8 flex justify-center mb-4">
                      <ArrowDown size={24} className="text-blue-500" />
                    </div>
                  )}
                  
                  {/* Bottom Row - Last 2 stages */}
                  {mindMapData.stages.length > 3 && (
                    <div className="flex justify-center items-start space-x-16 w-full">
                      {mindMapData.stages.slice(3).map((stage, stageIndex) => (
                        <div key={stage.stage} className="flex flex-col items-center">
                          {/* Stage Header */}
                          <div className="w-full p-3 rounded-lg bg-blue-100 border-2 border-blue-500 mb-2 text-center">
                            <h3 className="font-bold">Stage {stage.stage}</h3>
                          </div>
                          
                          {/* Points with connecting lines */}
                          <div className="relative">
                            {stage.output?.map((point, pointIndex) => (
                              <React.Fragment key={pointIndex}>
                                {renderPointBox(point, pointIndex)}
                                {pointIndex < stage.output.length - 1 && (
                                  <div className="flex justify-center">
                                    <ArrowDown size={20} className="text-gray-500 my-1" />
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          
                          {/* Right arrow between stages */}
                          {stageIndex < mindMapData.stages.slice(3).length - 1 && (
                            <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2">
                              <ArrowRight size={24} className="text-blue-500" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Mobile Mind Map Flow Diagram - Vertical Column */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full block md:hidden">
            <div className="flex flex-col items-center">
              {/* Center Title Node */}
              <div className="w-48 h-20 rounded-full bg-blue-100 border-4 border-blue-500 flex items-center justify-center mb-8">
                <p className="text-lg font-semibold text-center px-2">{mindMapData.title}</p>
              </div>
              
              {mindMapData.stages.length > 0 && (
                <div className="w-full max-w-md">
                  {/* Vertical stages with downward arrows */}
                  {mindMapData.stages.map((stage) => (
                    <div key={stage.stage} className="mb-6">
                      {/* Stage Header */}
                      <div className="w-full p-3 rounded-lg bg-blue-100 border-2 border-blue-500 mb-2 text-center">
                        <h3 className="font-bold">Stage {stage.stage}</h3>
                      </div>
                      
                      {/* Points with connecting lines */}
                      <div className="ml-4 pl-4 border-l-2 border-gray-300">
                        {stage.output?.map((point, pointIndex) => (
                          <React.Fragment key={pointIndex}>
                            {renderPointBox(point, pointIndex)}
                            {pointIndex < stage.output.length - 1 && (
                              <div className="flex justify-center">
                                <ArrowDown size={20} className="text-gray-500 my-1" />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      
                      {/* Down arrow between stages */}
                      {stage.stage < mindMapData.stages.length && (
                        <div className="flex justify-center mt-2">
                          <ArrowDown size={24} className="text-blue-500" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      
      {/* Chatbot Modal */}
{showChatbot && (
  <div className="fixed bottom-24 right-6 w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-10">
    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
      <h3 className="font-semibold text-lg">Mind Map Assistant</h3>
      <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>

    <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg max-w-[90%] ${message.sender === "bot" 
            ? "bg-blue-100 text-gray-800 self-start rounded-bl-none" 
            : "bg-green-100 text-gray-800 self-end rounded-br-none ml-auto"}`}
        >
          {message.text}
        </div>
      ))}
      {isBotTyping && (
        <div className="p-4 bg-blue-100 text-gray-800 self-start rounded-bl-none rounded-lg max-w-[90%]">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
    </div>

    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-3">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
        disabled={isBotTyping}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        disabled={isBotTyping}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  </div>
)}
    </div>
  );
};

export default MindMap;
