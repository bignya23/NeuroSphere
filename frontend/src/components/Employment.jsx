import { useState, useEffect } from "react";
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
            className={`p-4 w-1/3 text-xl font-semibold rounded-l-3xl ${
              activeTab === "assessment" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("assessment")}
          >
            Employment Assessment
          </button>
          <button
            className={`p-4 w-1/3 text-xl font-semibold ${
              activeTab === "resume" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("resume")}
          >
            Resume
          </button>
          <button
            className={`p-4 w-1/3 text-xl font-semibold rounded-r-3xl ${
              activeTab === "profile" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </div>

        {activeTab === "assessment" && <EmploymentAssessment />}
        {activeTab === "resume" && <ResumeInput />}
        {activeTab === "profile" && <ProfileSection />}
      </div>
    </div>
  );
};

const ProfileSection = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "John Doe" };
  
  // Initialize with demo data if nothing exists in localStorage
  const initialProfileData = {
    achievements: [
      "Completed Full-Stack Web Development Bootcamp",
      "Certified AWS Solutions Architect"
    ],
    education: [
      { institution: "ABC University", degree: "B.S. in Computer Science", years: "2018-2022" }
    ],
    skills: ["JavaScript, React, Node.js", "Python, Django, FastAPI"],
    jobTitle: "Software Developer",
    location: "New York, USA",
    email: "johndoe@example.com",
    phone: "(123) 456-7890"
  };

  const [profileData, setProfileData] = useState(() => {
    const savedData = localStorage.getItem("profileData");
    return savedData ? JSON.parse(savedData) : initialProfileData;
  });
  const [newAchievement, setNewAchievement] = useState("");
  const [newEducation, setNewEducation] = useState({ institution: "", degree: "", years: "" });
  const [newSkill, setNewSkill] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [basicInfo, setBasicInfo] = useState({
    jobTitle: profileData.jobTitle || "",
    location: profileData.location || "",
    email: profileData.email || "",
    phone: profileData.phone || ""
  });

  // Save to localStorage whenever profileData changes
  useEffect(() => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, [profileData]);

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setProfileData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement]
      }));
      setNewAchievement("");
    }
  };

  const handleDeleteAchievement = (index) => {
    setProfileData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleAddEducation = () => {
    if (newEducation.institution.trim() && newEducation.degree.trim()) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      setNewEducation({ institution: "", degree: "", years: "" });
    }
  };

  const handleDeleteEducation = (index) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (index) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({ ...prev, [name]: value }));
  };

  const saveBasicInfo = () => {
    setProfileData(prev => ({
      ...prev,
      jobTitle: basicInfo.jobTitle,
      location: basicInfo.location,
      email: basicInfo.email,
      phone: basicInfo.phone
    }));
    setEditMode(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Your Profile</h1>
        <button 
          onClick={() => setEditMode(!editMode)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {editMode ? "View Mode" : "Edit Mode"}
        </button>
      </div>

      <div className="flex items-center mb-8">
        <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mr-6 border-4 border-blue-200"
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">{(user.name).toUpperCase()}</h2>
          
          {editMode ? (
            <div className="space-y-2">
              <input
                type="text"
                name="jobTitle"
                value={basicInfo.jobTitle}
                onChange={handleBasicInfoChange}
                placeholder="Job Title"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="location"
                value={basicInfo.location}
                onChange={handleBasicInfoChange}
                placeholder="Location"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={basicInfo.email}
                onChange={handleBasicInfoChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="phone"
                value={basicInfo.phone}
                onChange={handleBasicInfoChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />
              <button 
                onClick={saveBasicInfo}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-600">{profileData.jobTitle}</p>
              <p className="text-gray-600">Location: {profileData.location}</p>
              <p className="text-gray-600">Email: {profileData.email}</p>
              <p className="text-gray-600">Phone: {profileData.phone}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-800">Achievements</h3>
          {editMode && (
            <div className="flex">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="New achievement"
                className="p-2 border rounded-l"
              />
              <button 
                onClick={handleAddAchievement}
                className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          )}
        </div>
        <ul className="space-y-2">
          {profileData.achievements.map((achievement, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-gray-700">• {achievement}</span>
              {editMode && (
                <button 
                  onClick={() => handleDeleteAchievement(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-800">Education</h3>
          {editMode && (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                placeholder="Institution"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                placeholder="Degree"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={newEducation.years}
                onChange={(e) => setNewEducation({...newEducation, years: e.target.value})}
                placeholder="Years"
                className="p-2 border rounded"
              />
              <button 
                onClick={handleAddEducation}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                Add Education
              </button>
            </div>
          )}
        </div>
        <ul className="space-y-3">
          {profileData.education.map((edu, index) => (
            <li key={index} className="p-3 bg-white rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{edu.institution}</p>
                  <p className="text-gray-600">{edu.degree}</p>
                  {edu.years && <p className="text-gray-500 text-sm">{edu.years}</p>}
                </div>
                {editMode && (
                  <button 
                    onClick={() => handleDeleteEducation(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-blue-800">Skills</h3>
          {editMode && (
            <div className="flex">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="New skill"
                className="p-2 border rounded-l"
              />
              <button 
                onClick={handleAddSkill}
                className="bg-blue-500 text-white px-3 py-2 rounded-r hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {profileData.skills.map((skill, index) => (
            <div key={index} className="flex items-center bg-white rounded-full px-4 py-2">
              <span className="text-gray-700">{skill}</span>
              {editMode && (
                <button 
                  onClick={() => handleDeleteSkill(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
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