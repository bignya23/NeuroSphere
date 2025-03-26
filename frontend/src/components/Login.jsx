import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        { email, password }
      );

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-300 p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-blue-400">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-500 p-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-2">🌈 Welcome Back to NeuroSphereAI!</h2>
          <p className="text-blue-100">Your space to grow, learn, and thrive.</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg animate-pulse">
              ❗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400 text-lg"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 focus:border-purple-400 text-lg"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl text-white font-bold text-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              }`}
            >
              {isLoading ? "🌿 Logging in..." : "✨ Log In"}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                New to NeuroSphereAI? {" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
