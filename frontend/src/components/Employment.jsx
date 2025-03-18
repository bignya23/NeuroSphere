import { useState } from "react";
import axios from "axios";
import ResumeInput from "./ResumeInput";

const Employment = () => {
  const [activeTab, setActiveTab] = useState("assessment"); // "assessment" or "resume"

  return (
    <div className="flex flex-col flex-grow w-full h-full bg-gray-100 p-6">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-around border-b mb-4">
          <button
            className={`p-2 ${activeTab === "assessment" ? "border-b-2 border-blue-500 font-bold" : ""}`}
            onClick={() => setActiveTab("assessment")}
          >
            Employment Assessment
          </button>
          <button
            className={`p-2 ${activeTab === "resume" ? "border-b-2 border-blue-500 font-bold" : ""}`}
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
    { question: "What type of work do you prefer?", options: ["Remote", "Hybrid", "On-site"] },
    { question: "What work environment do you feel comfortable in?", options: ["Quiet", "Structured", "Flexible", "Team-based", "Solo work"] },
    { question: "Do you have any specific needs or accommodations for your job?", options: ["Flexible schedule", "Noise-free space", "Clear instructions"] },
    { question: "What is your preferred job schedule?", options: ["Full-time", "Part-time", "Freelance", "Flexible Hours"] },
  ];

  const [responses, setResponses] = useState(questions.reduce((acc, q) => ({ ...acc, [q.question]: "" }), {}));
  const [jobResults, setJobResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (question, value) => {
    setResponses((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/autism/job_search/", {
        assessment: responses,
      });

      console.log("API Response:", response.data.jobs);
      setJobResults(response.data);
    } catch (error) {
      console.error("Submission error:", error);
      setError("Failed to submit assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!jobResults ? (
        <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md">
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <label className="block text-lg font-medium mb-2">{q.question}</label>
              {q.options ? (
                <select
                  className="w-full border p-2 rounded"
                  value={responses[q.question] || ""}
                  onChange={(e) => handleChange(q.question, e.target.value)}
                  required
                >
                  <option value="">Select an option</option>
                  {q.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={responses[q.question] || ""}
                  onChange={(e) => handleChange(q.question, e.target.value)}
                  placeholder="Your answer..."
                  required
                />
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">Job Matches</h3>
          {jobResults.jobs &&
            JSON.parse(jobResults.jobs).top_jobs.map((job, index) => (
              <div key={index} className="mb-4 p-3 border-b">
                <h4 className="font-bold">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company}</p>
                <p className="mt-1">{job.description.substring(0, 100)}...</p>
                <div className="mt-2 flex items-center">
                  <span className="mr-2">Match:</span>
                  <div className="bg-gray-200 h-4 w-32 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${Math.round(job.match_score * 100)}%` }}></div>
                  </div>
                  <span className="ml-2">{Math.round(job.match_score * 100)}%</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Employment;
