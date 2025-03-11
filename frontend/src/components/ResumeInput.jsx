import React, { useState } from "react";
import axios from "axios";

const ResumeInput = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    education: "",
    skills: "",
    projects: [{ title: "", description: "" }],
    experiences: [{ role: "", company: "", duration: "", responsibilities: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === "projects") {
      const updatedProjects = [...formData.projects];
      updatedProjects[index][name] = value;
      setFormData({ ...formData, projects: updatedProjects });
    } else if (type === "experiences") {
      const updatedExperiences = [...formData.experiences];
      updatedExperiences[index][name] = value;
      setFormData({ ...formData, experiences: updatedExperiences });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (type) => {
    if (type === "projects") {
      setFormData({
        ...formData,
        projects: [...formData.projects, { title: "", description: "" }],
      });
    } else if (type === "experiences") {
      setFormData({
        ...formData,
        experiences: [
          ...formData.experiences,
          { role: "", company: "", duration: "", responsibilities: "" },
        ],
      });
    }
  };

  const formatProjectsData = () => {
    return formData.projects
      .filter((project) => project.title.trim() !== "")
      .map((project) => ({
        title: project.title,
        description: project.description,
      }));
  };

  const formatExperienceData = () => {
    return formData.experiences
      .filter((exp) => exp.role.trim() !== "" && exp.company.trim() !== "")
      .map((exp) => ({
        role: exp.role,
        company: exp.company,
        duration: exp.duration,
        responsibilities: exp.responsibilities,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user_resume_data = {
        name: formData.name,
        phno: formData.phone,  // Match key name
        email: formData.email,
        linkedin: formData.linkedin || formData.github,
        education: formData.education,
        skills: formData.skills,
        projects: formatProjectsData(),
        experience: formatExperienceData(),
      };
      
     console.log("payload: ", user_resume_data)
      const response = await axios.post("http://127.0.0.1:8000/api/autism/resume_generate/", user_resume_data, {
        responseType: "blob", // Expecting a file response
        headers: { "Content-Type": "application/json" },
      });
     console.log("response is  : ", response)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while generating the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Resume Generator</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          required
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="github"
          placeholder="GitHub Profile"
          value={formData.github}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />

        <h3 className="text-lg font-semibold">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => handleChange(e, index, "projects")}
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => handleChange(e, index, "projects")}
              className="w-full border p-2 rounded mb-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("projects")}
          className="mb-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Project
        </button>

        <h3 className="text-lg font-semibold">Experience</h3>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleChange(e, index, "experiences")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleChange(e, index, "experiences")}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleChange(e, index, "experiences")}
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              name="responsibilities"
              placeholder="Responsibilities"
              value={exp.responsibilities}
              onChange={(e) => handleChange(e, index, "experiences")}
              className="w-full border p-2 rounded mb-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => addField("experiences")}
          className="mb-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Experience
        </button>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </form>

      {downloadLink && (
        <a
          href={downloadLink}
          download="resume.pdf"
          className="block text-center mt-4 p-2 bg-gray-800 text-white rounded"
        >
          Download Resume
        </a>
      )}
    </div>
  );
};

export default ResumeInput;
