import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate(); // Redirect function

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        await axios.post(
          "http://localhost:8000/api/auth/logout/",
          { refresh_token: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      }

      // Clear all authentication data
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setIsAuthenticated(false)
  
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      navigate("/");
    }
  };

  // Close menu on navigation (for mobile)
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-gray-800"
          onClick={closeMenu}
        >
          <img
            src="/logo.webp"
            alt="NeuroSphereAI Logo"
            className="w-10 h-10 mr-2"
          />
          NeuroSphereAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:justify-center md:items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
            Home
          </Link>
          <Link
            to="/about-us"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Contact
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300 px-6 py-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-500 transition"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="block text-gray-700 hover:text-blue-500 transition"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-500 transition"
            onClick={closeMenu}
          >
            Contact
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-blue-500 transition"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
