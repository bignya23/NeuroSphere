import { useState } from "react";
import axios from "axios";

const Employment = () => {
  
  const questions = [
    { question: "What are your skills and interests?" },
    { question: "What type of work do you prefer?", options: ["Remote", "Hybrid", "On-site"] },
    { question: "What work environment do you feel comfortable in?", options: ["Quiet", "Structured", "Flexible", "Team-based", "Solo work"] },
    { question: "Do you have any specific needs or accommodations for your job?", options: ["Flexible schedule", "Noise-free space", "Clear instructions"] },
    { question: "What is your preferred job schedule?", options: ["Full-time", "Part-time", "Freelance", "Flexible Hours"] }
  ];

  // Initialize responses state
  const [responses, setResponses] = useState(
    questions.reduce((acc, q) => ({ ...acc, [q.question]: "" }), {})
  );

  // Handle input change
  const handleChange = (question, value) => {
    setResponses((prev) => ({ ...prev, [question]: value }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/submit-assessment", { responses })
      .then(() => alert("Assessment submitted successfully!"))
      .catch((error) => console.error("Submission error:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Employment Assessment</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {questions.map((q, index) => (
          <div key={index} className="mb-4">
            <label className="block text-lg font-medium mb-2">{q.question}</label>
            {q.options ? (
              <select
                className="w-full border p-2 rounded"
                value={responses[q.question] || ""}
                onChange={(e) => handleChange(q.question, e.target.value)}
              >
                <option value="">Select an option</option>
                {q.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={responses[q.question]}
                onChange={(e) => handleChange(q.question, e.target.value)}
                placeholder="Your answer..."
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Employment;
