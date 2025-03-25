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
    experiences: [
      { role: "", company: "", duration: "", responsibilities: "" },
    ],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Access token is missing.");
      setLoading(false);
      return;
    }
    try {
      const user_resume_data = {
        ...formData,
        projects: formData.projects.filter((p) => p.title.trim() !== ""),
        experiences: formData.experiences.filter(
          (exp) => exp.role.trim() !== "" && exp.company.trim() !== ""
        ),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/autism/resume_generate/",
        user_resume_data,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className="flex flex-col w-full h-full p-4 overflow-y-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Resume Generator</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" required />
          <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={formData.linkedin} onChange={handleChange} className="border p-2 rounded" />
          <input type="text" name="github" placeholder="GitHub Profile" value={formData.github} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <textarea name="education" placeholder="Education" value={formData.education} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange} className="w-full border p-2 rounded" />

        <h3 className="text-xl font-semibold">Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={(e) => handleChange(e, index, "projects")} className="w-full border p-2 rounded" />
            <textarea name="description" placeholder="Project Description" value={project.description} onChange={(e) => handleChange(e, index, "projects")} className="w-full border p-2 rounded mt-2" />
          </div>
        ))}
        <button type="button" onClick={() => addField("projects")} className="text-blue-600">+ Add Project</button>

        <h3 className="text-xl font-semibold">Experience</h3>
        {formData.experiences.map((exp, index) => (
          <div key={index} className="mb-4">
            <input type="text" name="role" placeholder="Role" value={exp.role} onChange={(e) => handleChange(e, index, "experiences")} className="w-full border p-2 rounded" />
            <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, index, "experiences")} className="w-full border p-2 rounded mt-2" />
            <input type="text" name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleChange(e, index, "experiences")} className="w-full border p-2 rounded mt-2" />
            <textarea name="responsibilities" placeholder="Responsibilities" value={exp.responsibilities} onChange={(e) => handleChange(e, index, "experiences")} className="w-full border p-2 rounded mt-2" />
          </div>
        ))}
        <button type="button" onClick={() => addField("experiences")} className="text-blue-600">+ Add Experience</button>

        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded w-full lg:w-1/4" disabled={loading}>{loading ? "Generating..." : "Generate Resume"}</button>
          {downloadLink && <a href={downloadLink} download="resume.pdf" className="block text-center mt-4 lg:mt-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full lg:w-1/4">Download Resume</a>}
        </div>
      </form>
    </div>
  );
};

export default ResumeInput;
