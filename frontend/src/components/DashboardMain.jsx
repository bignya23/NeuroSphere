import React, { useState, useEffect } from "react";
import TaskManager from "./TaskManager";
import DailySchedule from "./DailySchedule";

const DashboardMain = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [quote, setQuote] = useState("Loading inspirational quote...");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        setQuote(data.content);
      } catch (error) {
        setQuote("Stay positive and keep moving forward!");
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="p-6 text-center bg-white shadow-sm rounded-xl mx-4 mt-4 border border-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-800">
          Welcome, {user.name.toUpperCase()}
        </h2>
        <p className="text-xl text-indigo-600 font-medium mt-2">"{quote}"</p>
        <div className="mt-4 flex justify-center space-x-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            Today: {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Task Sections */}
      <div className="flex flex-col lg:flex-row p-6 gap-6">
        {/* Left Section - Daily Tasks */}
        <div className="flex-1 bg-white p-6 shadow-sm rounded-xl border-l-8 border-indigo-400">
          <div className="flex items-center mb-4">
            <div className="w-3 h-8 bg-indigo-400 rounded-full mr-3"></div>
            <h3 className="text-2xl font-bold text-indigo-800">Daily Tasks</h3>
          </div>
          <TaskManager />
        </div>

        {/* Right Section - Hobby-Based Tasks */}
        <div className="flex-1 bg-white p-6 shadow-sm rounded-xl border-l-8 border-teal-400">
          <div className="flex items-center mb-4">
            <div className="w-3 h-8 bg-teal-400 rounded-full mr-3"></div>
            <h3 className="text-2xl font-bold text-teal-800">
              Hobby-Based Tasks
            </h3>
          </div>
          <DailySchedule />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
