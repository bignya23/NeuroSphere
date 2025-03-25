import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Circle } from "lucide-react";

const DailySchedule = () => {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = localStorage.getItem("dailyTasks");
      const lastFetchDate = localStorage.getItem("lastFetchDate");
      const storedCheckedTasks = JSON.parse(localStorage.getItem("checkedTasks")) || {};
      const currentDate = new Date().toISOString().split("T")[0];

      setCheckedTasks(storedCheckedTasks);

      if (storedTasks && lastFetchDate === currentDate) {
        try {
          const parsedTasks = JSON.parse(storedTasks);
          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks);
            return;
          }
        } catch (error) {
          console.error("Error parsing tasks:", error);
        }
      }

      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.post(
          "http://localhost:8000/api/autism/tasks_generate/",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let tasksList = [];
        if (typeof response.data.tasks === "string") {
          tasksList = JSON.parse(response.data.tasks);
        } else if (Array.isArray(response.data.tasks)) {
          tasksList = response.data.tasks;
        }

        setTasks(tasksList);
        localStorage.setItem("dailyTasks", JSON.stringify(tasksList));
        localStorage.setItem("lastFetchDate", currentDate);
        localStorage.setItem("checkedTasks", JSON.stringify({}));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleCheckboxChange = (taskId) => {
    const updatedCheckedTasks = {
      ...checkedTasks,
      [taskId]: !checkedTasks[taskId],
    };
    setCheckedTasks(updatedCheckedTasks);
    localStorage.setItem("checkedTasks", JSON.stringify(updatedCheckedTasks));
  };

  return (
    <div className="space-y-4">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-4 rounded-lg transition-all duration-200 ${
                checkedTasks[task.id] 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-white border border-indigo-100 hover:border-indigo-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => handleCheckboxChange(task.id)}
                  className="mt-1 text-indigo-400 hover:text-indigo-600 focus:outline-none"
                  aria-label={checkedTasks[task.id] ? "Mark task incomplete" : "Mark task complete"}
                >
                  {checkedTasks[task.id] ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    checkedTasks[task.id] ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {task.task}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                      {task.category}
                    </span>
                    {checkedTasks[task.id] && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700">No tasks available for today</h3>
          <p className="mt-1 text-gray-500">Check back later or create your own tasks</p>
        </div>
      )}
      
      {tasks.length > 0 && (
        <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-800">
              Progress: {Object.values(checkedTasks).filter(Boolean).length} / {tasks.length} completed
            </span>
            <div className="w-1/2 bg-indigo-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ 
                  width: `${(Object.values(checkedTasks).filter(Boolean).length / tasks.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySchedule;