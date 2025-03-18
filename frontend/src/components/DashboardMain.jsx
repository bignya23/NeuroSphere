import React from "react";
import { BellIcon, LogOutIcon } from "lucide-react";
import TaskManager from "./TaskManager";

const DashboardMain = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Logo</h1>
        <div className="flex items-center gap-4">
          <BellIcon className="w-6 h-6 text-gray-600 cursor-pointer" />
          <button className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            <LogOutIcon className="w-4 h-4" /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6 text-center bg-white shadow-md mt-2">
        <h2 className="text-3xl font-semibold">Welcome, John Doe</h2>
        <p className="text-xl text-gray-700 font-semibold mt-2 italic">
          “Two things are infinite: the universe and human stupidity; and I'm
          not sure about the universe.”
        </p>
      </div>

      {/* Task Sections */}
      <div className="flex flex-wrap p-6 gap-6">
        {/* Left Section - Daily Tasks */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-md">
          <h3 className="text-xl font-bold text-blue-600">Daily Tasks</h3>
         <TaskManager />
        </div>

        {/* Right Section - Hobby-Based Tasks */}
        <div className="flex-1 bg-white p-4 shadow-md rounded-md">
          <h3 className="text-xl font-bold text-green-600">
            Hobby-Based Tasks
          </h3>
         <TaskManager />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
