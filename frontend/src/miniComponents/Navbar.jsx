import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
  
      if (!refreshToken) {
        console.warn("No refresh token found. Redirecting to homepage.");
        localStorage.clear();
        setIsAuthenticated(false);
        navigate("/");
        window.location.reload();
        return;
      }
  
      // Perform logout API call
      await axios.post(
        "http://localhost:8000/api/auth/logout/",
        { refresh_token: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      //console.log("Logout successful.");
    } catch (error) {
      console.error("Logout error:", error?.response?.data || error.message);
    } finally {
      localStorage.clear();
      setIsAuthenticated(false);
      navigate("/");
      window.location.reload();
    }
  };
  

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold text-purple-700"
          onClick={closeMenu}
        >
          NeuroSphere
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600">
            Home
          </Link>
          <Link to="/about-us" className="text-gray-700 hover:text-purple-600">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600">
            Contact
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-purple-600"
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all"
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
            className="block text-gray-700 hover:text-purple-600"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="block text-gray-700 hover:text-purple-600"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-purple-600"
            onClick={closeMenu}
          >
            Contact
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-purple-600"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/signup"
              className="block w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all"
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
