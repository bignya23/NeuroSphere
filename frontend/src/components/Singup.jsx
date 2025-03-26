import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    parents_email: "",
    phone_number: "",
    disease: "",
    disease_level: "",
    username: "",
    gender: "",
    hobbies: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      username: name === "email" ? value : formData.username,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup/",
        formData
      );

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Oops! Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-200 to-blue-300 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-6 border-4 border-blue-400">
        <h2 className="text-4xl font-extrabold text-blue-700 text-center mb-4">Welcome to NeuroSphereAI! 🌿</h2>
        <p className="text-gray-600 text-center mb-6">Create a personalized experience with us</p>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg animate-pulse">{error}</div>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="w-full">
              <label className="block text-gray-800 mb-2 capitalize font-semibold">{key.replace('_', ' ')}</label>
              {key === "password" ? (
                <input
                  type="password"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-400"
                  placeholder={`Enter your ${key}`}
                  required
                />
              ) : key === "gender" || key === "disease" || key === "disease_level" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-400"
                  required
                >
                  <option value="">Select {key.replace('_', ' ')}</option>
                  {key === "gender" && ["Male", "Female", "Other"].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                  {key === "disease" && ["Autism", "ADSD", "Dyslexia"].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                  {key === "disease_level" && ["Level 1", "Level 2", "Level 3"].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={key === "age" ? "number" : key === "phone_number" ? "text" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-400"
                  placeholder={`Enter your ${key}`}
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="col-span-1 md:col-span-2 w-full py-3 bg-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            {isLoading ? "Creating Account..." : "Sign Up Now! 🚀"}
          </button>

          <p className="text-center md:col-span-2 mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Log In Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;