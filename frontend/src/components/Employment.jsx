import { useState } from "react";
import axios from "axios";
import ResumeInput from "./ResumeInput";
import SecondAssessment from "./SecondAssessment";

const Employment = () => {
  const [activeTab, setActiveTab] = useState("assessment");
  
  return (
    <div className="flex flex-col flex-grow w-full h-full bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg transition-transform transform">
        <div className="flex justify-center mb-8">
          <button
            className={`p-4 w-1/2 text-xl font-semibold rounded-l-3xl ${
              activeTab === "assessment" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("assessment")}
          >
            Employment Assessment
          </button>
          <button
            className={`p-4 w-1/2 text-xl font-semibold rounded-r-3xl ${
              activeTab === "resume" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("resume")}
          >
            Resume
          </button>
        </div>

        {activeTab === "assessment" ? <EmploymentAssessment /> : <ResumeInput />}
      </div>
    </div>
  );
};

const EmploymentAssessment = () => {
  const questions = [
    { question: "What are your skills and interests?" },
    {
      question: "What type of work do you prefer?",
      options: ["Remote", "Hybrid", "On-site"],
    },
    {
      question: "What work environment do you feel comfortable in?",
      options: ["Quiet", "Structured", "Flexible", "Team-based", "Solo work"],
    },
    {
      question: "Do you have any specific needs or accommodations for your job?",
      options: ["Flexible schedule", "Noise-free space", "Clear instructions"],
    },
    {
      question: "What is your preferred job schedule?",
      options: ["Full-time", "Part-time", "Freelance", "Flexible Hours"],
    },
  ];

  const [responses, setResponses] = useState(
    questions.reduce((acc, q) => ({ ...acc, [q.question]: "" }), {})
  );
  const [jobResults, setJobResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSecondAssessment, setShowSecondAssessment] = useState(false);

  const handleChange = (question, value) => {
    setResponses((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/job_search/",
        {
          assessment: responses,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setJobResults(response.data);
    } catch (error) {
      console.error("Submission error:", error);
      setError("Failed to submit assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showSecondAssessment) {
    return <SecondAssessment />;
  }

  return (
    <div>
      {!jobResults ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-semibold mb-2 text-blue-800">
                {q.question}
              </label>
              {q.options ? (
                <select
                  className="w-full border p-3 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-300"
                  value={responses[q.question] || ""}
                  onChange={(e) => handleChange(q.question, e.target.value)}
                  required
                >
                  <option value="">Select an option</option>
                  {q.options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full border p-3 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-300"
                  value={responses[q.question] || ""}
                  onChange={(e) => handleChange(q.question, e.target.value)}
                  placeholder="Your answer..."
                  required
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4">Your Job Matches</h3>
          {jobResults.jobs &&
            JSON.parse(jobResults.jobs).top_jobs.map((job, index) => (
              <div key={index} className="mb-6 p-4 bg-blue-50 rounded-lg shadow-md">
                <h4 className="font-bold text-lg text-blue-900">{job.title}</h4>
                <p className="text-gray-600">{job.company}</p>
                <p>{job.description.substring(0, 100)}...</p>
              </div>
            ))}
          
          <div className="mt-6 text-center">
            <button 
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
              onClick={() => setShowSecondAssessment(true)}
            >
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employment;