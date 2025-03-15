import { useContext, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {
  FiHome,
  FiMessageSquare,
  FiHeadphones,
  FiClipboard,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { RiGamepadLine, RiGroupLine } from "react-icons/ri";
import { MdOutlineWork } from "react-icons/md";
import axios from "axios";
import { Context } from "../main";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "John Doe",
    profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
  };

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
      setIsAuthenticated(false);
      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Hamburger Menu (Mobile) */}
      <button
        className="absolute top-4 left-4 md:hidden z-50 bg-blue-500 text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative md:w-72 flex flex-col overflow-hidden`}
      >
        <div className="p-8 flex flex-col items-center border-b">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-blue-500"
          />
          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        </div>

        {/* Close Button (Mobile) */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-600"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FiX size={24} />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 mt-6">
          <ul className="space-y-3">
            <li>
              <Link
                to="/dashboard/home"
                className="flex items-center p-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg mx-4"
              >
                <FiHome className="mr-4" size={22} /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/chatbot"
                className="flex items-center p-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg mx-4"
              >
                <FiMessageSquare className="mr-4" size={22} /> Chatbot
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/voice"
                className="flex items-center p-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg mx-4"
              >
                <FiHeadphones className="mr-4" size={22} /> Voice Agent
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/employment"
                className="flex items-center p-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg mx-4"
              >
                <MdOutlineWork className="mr-4" size={22} /> Employment
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/tasks"
                className="flex items-center p-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg mx-4"
              >
                <FiClipboard className="mr-4" size={22} /> Task Manager
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/resume"
                className="flex items-center p-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg mx-4"
              >
                <RiGamepadLine className="mr-4" size={22} /> Resume
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/community-chat"
                className="flex items-center p-4 text-lg text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg mx-4"
              >
                <RiGroupLine className="mr-4" size={22} /> Community Chat
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center p-4 text-lg text-red-500 bg-red-100 hover:bg-red-500 hover:text-white rounded-lg mx-4 w-full"
          >
            <FiLogOut className="mr-4" size={22} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <Outlet /> {/* Renders the nested DashboardRoutes */}
      </main>
    </div>
  );
};

export default Dashboard;
