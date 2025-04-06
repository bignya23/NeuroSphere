import React, { useState, useRef, useEffect } from "react";

const Podcast = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audioWebSocket, setAudioWebSocket] = useState(null);
  const [isPodcastActive, setIsPodcastActive] = useState(false);
  const [conversationStage, setConversationStage] = useState(0);
  const [transcript, setTranscript] = useState("");
  const ws = useRef(null);
  const audioContextRef = useRef(null);
  const workletNodeRef = useRef(null);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  // Initialize messages
  useEffect(() => {
    setMessages([
      {
        type: "ai",
        speaker: "System",
        content:
          "Welcome User! I'm your podcast assistant ready to discuss topics or answer questions. Type your query to begin our conversation.",
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close websockets on component unmount
  useEffect(() => {
    return () => {
      if (socket) socket.close();
      if (audioWebSocket) audioWebSocket.close();
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [socket, audioWebSocket, audioStream]);

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Submit text for processing
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input) return;

    const newMessage = {
      type: "user",
      speaker: "You",
      content: input,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    setIsTaskLoading(true);

    try {
      const response = await fetch("http://localhost:8080/process-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.detail);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          speaker: "System",
          content: result.summary || "I processed your request.",
          time: new Date().toLocaleTimeString(),
        },
      ]);

      // Auto-start podcast after processing text
      setTimeout(() => {
        if (!isPodcastActive) {
          startPodcast();
        }
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          speaker: "System",
          content:
            "Sorry, I encountered an error processing your request. Please try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTaskLoading(false);
      setInput("");
    }
  };

  // Start the podcast conversation
  const startPodcast = () => {
    if (isPodcastActive) {
      //console.log("Podcast is already active.");
      return;
    }

    // Close existing socket if any
    if (ws.current) {
      ws.current.close();
    }

    // Initialize WebSocket if not already initialized
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      ws.current = new WebSocket("ws://127.0.0.1:8080/ws");

      ws.current.onopen = () => {
       // console.log("Podcast WebSocket connection established");
        setIsPodcastActive(true);
        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            speaker: "System",
            content:
              "Podcast started. Alex and Emma will begin discussing your content.",
            time: new Date().toLocaleTimeString(),
          },
        ]);
      };

      ws.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
         // console.log("Received WebSocket message:", data);

          // Handle incoming podcast message
          if (data.speaker && data.text) {
            // Add message to conversation
            setMessages((prev) => [
              ...prev,
              {
                type: "ai",
                speaker: data.speaker,
                content: data.text.replace("[end_of_query]", ""),
                time: new Date().toLocaleTimeString(),
                audioUrl: data.audio,
              },
            ]);

            // Update conversation stage
            if (data.stage) {
              setConversationStage(data.stage);
            }
        //console.log(data.audio)
            // Play audio
            if (data.audio) {
              // Stop any currently playing audio
              if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
              }

              const audio = new Audio(data.audio);
             // console.log(audio)
              setIsAudioPlaying(true);
              setCurrentAudio(audio);

              audio.onended = () => {
                setIsAudioPlaying(false);
                //console.log("Audio playback completed.");

                // Send acknowledgment to server
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                  ws.current.send(JSON.stringify({ message: "Chunks" }));
                }
              };

              audio.play().catch((error) => {
                console.error("Error playing audio:", error);
                // Still send acknowledgment if audio fails
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                  ws.current.send(JSON.stringify({ message: "Chunks" }));
                }
              });
            }
          }

          // Handle recording-related messages
          if (data.Final) {
            setTranscript((prev) => prev + " " + data.Final);
            //console.log("Final transcript received:", data.Final);

            // Close the microphone
            if (audioContextRef.current) {
              await audioContextRef.current.close();
              audioContextRef.current = null;
            }
            if (workletNodeRef.current) {
              workletNodeRef.current.disconnect();
              workletNodeRef.current = null;
            }
            setIsRecording(false); // Stop recording state
           // console.log("Microphone closed.");
            setIsLoading(true);
            // Send "Yes" response to the server
            const payload = { message: "Yes", input: data.Final };
            console.log("Sending to server:", payload);
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
              ws.current.send(JSON.stringify(payload));
            }

            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
              ws.current.send(JSON.stringify(payload));
            }
           // console.log("send twice to server:", payload);
            // Wait for server confirmation
            const response = await new Promise((resolve) => {
              const listener = (event) => {
                try {
                  const responseData = JSON.parse(event.data);
                  if (responseData.message === "Yes") {
                    resolve(responseData);
                  }
                } catch (error) {
                  console.error("Error processing server response:", error);
                } finally {
                  ws.current.removeEventListener("message", listener);
                  setIsLoading(false);
                }
              };
              ws.current.addEventListener("message", listener);
            });

          //  console.log("Server response:", response);

            // Call endpoint_user if server confirms
            if (response.message === "Yes") {
              await endpoint_user(user_id, response.input, ws.current);
              console.log("Loop ended");
            }
          }
        } catch (error) {
          console.error("Error processing WebSocket message:", error);
        }
      };

      ws.current.onerror = (error) => {
        console.error("Podcast WebSocket Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            type: "system",
            speaker: "System",
            content:
              "Error connecting to the podcast service. Please try again.",
            time: new Date().toLocaleTimeString(),
          },
        ]);
      };
    }
  };

  const startRecording = async () => {
    if (isRecording) return;

    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsAudioPlaying(false);
    }

    setIsRecording(true);

    // Ensure WebSocket is open
    if (!ws.current || ws.current.readyState === WebSocket.CLOSED) {
      console.error("WebSocket is not open.");
      setIsRecording(false);
      return;
    }

    // Send "chunks" message to the server
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ message: "chunks" }));
    }

    // Get Microphone Input
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(stream);

      // Load Audio Worklet
      await audioContextRef.current.audioWorklet.addModule("/processor.js");

      // Create Worklet Node
      workletNodeRef.current = new AudioWorkletNode(
        audioContextRef.current,
        "audio-processor"
      );
      source.connect(workletNodeRef.current);
      workletNodeRef.current.connect(audioContextRef.current.destination);

      // Send processed audio chunks to WebSocket
      workletNodeRef.current.port.onmessage = (event) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(event.data);
        }
      };
      setIsLoading(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    workletNodeRef.current?.disconnect();
    audioContextRef.current?.close();
    //console.log("🎤 Recording Stopped");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-800 overflow-hidden">
    {/* Left Panel - Full width on mobile, 40% on desktop */}
    <div className="w-full md:w-2/5 border-r-0 md:border-r-2 border-blue-500 flex flex-col p-4 md:p-6 bg-white">
      <p className="text-gray-600 mb-4 md:mb-6 text-sm">
        Your intelligent podcast assistant. Ask questions to start a conversation.
      </p>
  
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="flex-grow">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            What would you like to discuss?
          </label>
          <textarea
            className="w-full h-48 md:h-64 p-3 md:p-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
            placeholder="Type your question or prompt here..."
            value={input}
            onChange={handleInputChange}
          />
        </div>
  
        <button
          type="submit"
          disabled={!input || isLoading}
          className={`mt-4 md:mt-6 py-2 md:py-3 px-4 rounded-lg font-medium ${
            !input || isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          } transition duration-200`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
              Submit
            </span>
          )}
        </button>
      </form>
    </div>
  
    {/* Right Panel - Full width on mobile, 60% on desktop */}
    <div className="w-full md:w-3/5 flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <h2 className="text-lg md:text-xl font-semibold text-blue-600">
          Conversation {isPodcastActive ? `- Stage ${conversationStage}` : ""}
        </h2>
        <div className="flex items-center text-xs md:text-sm text-gray-500">
          <span className="flex items-center mr-2 md:mr-4">
            <span
              className={`h-2 w-2 rounded-full ${
                isPodcastActive ? "bg-green-500" : "bg-red-500"
              } mr-1`}
            ></span>
            {isPodcastActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
  
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-3 md:p-5 bg-white">
        <div className="space-y-4 md:space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 md:p-4 rounded-lg shadow-sm ${
                message.type === "user"
                  ? "bg-blue-50 ml-8 md:ml-16 border-l-4 border-blue-500"
                  : message.type === "system"
                  ? "bg-gray-100 border border-gray-200 text-center max-w-md mx-auto"
                  : message.speaker === "Alex"
                  ? "bg-indigo-50 mr-8 md:mr-16 border-l-4 border-indigo-500"
                  : message.speaker === "Emma"
                  ? "bg-pink-50 mr-8 md:mr-16 border-l-4 border-pink-500"
                  : "bg-gray-50 mr-8 md:mr-16 border-l-4 border-blue-500"
              }`}
            >
              <div className="flex justify-between items-center mb-1 md:mb-2">
                <div className="flex items-center">
                  {message.type === "user" ? (
                    <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                  ) : message.type === "system" ? (
                    <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  ) : message.speaker === "Alex" ? (
                    <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                  ) : message.speaker === "Emma" ? (
                    <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-pink-200 flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-pink-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <span className="font-bold text-xs md:text-sm">
                    {message.speaker ||
                      (message.type === "user"
                        ? "You"
                        : message.type === "system"
                        ? "System"
                        : "Tamul AI")}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="ml-8 md:ml-10 text-sm md:text-base">{message.content}</p>
              {message.audioUrl && (
                <div className="mt-2 md:mt-3 ml-8 md:ml-10">
                  <div className="flex items-center">
                    <button
                      className="flex items-center justify-center text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 md:px-3 md:py-1 rounded"
                      onClick={() => {
                        const audio = new Audio(message.audioUrl);
                        audio.play();
                      }}
                    >
                      <svg
                        className="w-3 h-3 md:w-4 md:h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Replay
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
  
          {isLoading && (
            <div className="flex justify-center items-center p-3 md:p-4">
              <div className="loader">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 md:h-3 md:w-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="h-2 w-2 md:h-3 md:w-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 md:h-3 md:w-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
  
          {/* Task Loader */}
          {isTaskLoading && (
            <div className="flex justify-center items-center p-3 md:p-4">
              <div className="loader">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 md:h-3 md:w-3 bg-purple-500 rounded-full animate-bounce"></div>
                  <div
                    className="h-2 w-2 md:h-3 md:w-3 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 md:h-3 md:w-3 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
  
          <div ref={messagesEndRef} />
        </div>
      </div>
  
      {/* Voice Input Button */}
      <div className="p-3 md:p-4 border-t border-gray-200 bg-white flex justify-center">
        <button
          className={`w-full py-2 md:py-3 px-4 rounded-lg font-medium flex items-center justify-center transition duration-200 shadow-sm ${
            isRecording
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          onClick={startRecording}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isRecording ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            )}
          </svg>
          {isRecording
            ? "Recording... (Stops after 2s of silence)"
            : "Join Conversation"}
        </button>
      </div>
    </div>
  </div>
  );
};

export default Podcast;
