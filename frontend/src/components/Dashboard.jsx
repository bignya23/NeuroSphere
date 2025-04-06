import { useContext, useEffect, useState } from "react";
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
import { BiSupport } from "react-icons/bi";
import { IoLogoGameControllerB } from "react-icons/io";
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

  useEffect(() => {
    // Simple one-time reload logic
    const hasVisited = localStorage.getItem('dashboardFirstVisit');
    
    if (!hasVisited) {
      // Set flag before reloading to prevent reload loops
      localStorage.setItem('dashboardFirstVisit', 'true');
      
      // Reload the page once
      window.location.reload();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://34.59.107.23/backend/api/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-indigo-50">
      {/* Hamburger Menu (Mobile) */}
      <button
        className="fixed top-4 left-4 md:hidden z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:w-72 flex flex-col overflow-hidden z-40`}
      >
        <div className="p-6 flex flex-col items-center border-b border-indigo-100">
          <div className="relative">
            <img
              src="https://avatar.iran.liara.run/public"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-indigo-200"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-indigo-900">{user.name}</h2>
          <p className="text-sm text-indigo-500">Daily Achiever</p>
        </div>

        {/* Close Button (Mobile) */}
        <button
          className="absolute top-4 right-4 md:hidden text-indigo-600 hover:text-indigo-800"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FiX size={24} />
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 mt-6 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/"
                className="flex items-center p-4 text-lg text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors duration-200"
              >
                <FiHome className="mr-4 text-indigo-500" size={22} /> 
                <span>Home</span>
                <div className="ml-auto w-2 h-2 bg-indigo-400 rounded-full"></div>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/chatbot"
                className="flex items-center p-4 text-lg text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors duration-200"
              >
                <FiMessageSquare className="mr-4 text-indigo-500" size={22} /> 
                <span>Chatbot</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/education"
                className="flex items-center p-4 text-lg text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors duration-200"
              >
                <MdOutlineWork className="mr-4 text-indigo-500" size={22} /> 
                <span>Education</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/employment"
                className="flex items-center p-4 text-lg text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors duration-200"
              >
                <MdOutlineWork className="mr-4 text-indigo-500" size={22} /> 
                <span>Employment</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/community-chat"
                className="flex items-center p-4 text-lg text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors duration-200"
              >
                <RiGroupLine className="mr-4 text-indigo-500" size={22} /> 
                <span>Community Chat</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/games"
                className="flex items-center p-4 text-lg text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors duration-200"
              >
                <IoLogoGameControllerB className="mr-4 text-indigo-500" size={22}/> 
                <span>Games</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/support"
                className="flex items-center p-4 text-lg text-indigo-800 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors duration-200"
              >
                <BiSupport className="mr-4 text-indigo-500" size={22}/> 
                <span>Support</span>
              </Link>
            </li>
           
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;