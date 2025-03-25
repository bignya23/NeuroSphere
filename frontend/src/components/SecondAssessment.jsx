import { useState, useEffect } from "react";
import axios from "axios";

const SecondAssessment = () => {
  const [assessmentData, setAssessmentData] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  useEffect(() => {
    fetchSecondAssessment();
  }, []);

  const fetchSecondAssessment = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Access token is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/autism/second_assessment/",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAssessmentData(response.data.second_assessment);
      const initialResponses = {};
      Object.keys(response.data.second_assessment).forEach(category => {
        response.data.second_assessment[category].forEach(question => {
          initialResponses[question] = "";
        });
      });
      setResponses(initialResponses);
    } catch (error) {
      setError("Failed to get second assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResponseChange = (question, value) => {
    setResponses(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("access_token");

    if (!token) {
      setError("Access token is missing.");
      setSubmitting(false);
      return;
    }

    try {
      const result = await axios.post(
        "http://127.0.0.1:8000/api/autism/second_assessment_result/",
        { question_answer: responses },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      setAssessmentResult(result.data.results);
      
      setSubmitSuccess(true);
    } catch (error) {
      setError("Failed to submit assessment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading assessment questions...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  if (submitSuccess && assessmentResult) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-600 mb-4">Assessment Submitted Successfully!</h3>
        <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-3">Assessment Results:</h4>
          <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: assessmentResult.replace(/\n/g, '<br/>') }} />
        </div>
        <div className="mt-6 text-center">
          <p>Thank you for completing the second assessment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Detailed Assessment</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(assessmentData).map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">{category}</h3>
            {assessmentData[category].map((question, questionIndex) => (
              <div key={questionIndex} className="mb-6 bg-gray-50 p-4 rounded-lg">
                <p className="mb-3 font-medium">{question}</p>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 min-h-32"
                  value={responses[question] || ""}
                  onChange={(e) => handleResponseChange(question, e.target.value)}
                  placeholder="Your answer..."
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 disabled:bg-blue-300"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Assessment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondAssessment;