import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "../miniComponents/QuestionCard";

const TaskManager = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({
    numTasks: 0,
    tasks: [],
    addBreaks: "no",
    numBreaks: 0,
    breaks: [],
    dayDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleOptions, setScheduleOptions] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scheduleConfirmed, setScheduleConfirmed] = useState(false);

  // Generate questions based on current state
  const generateQuestions = () => [
    {
      key: "numTasks",
      text: "Enter the number of tasks you have:",
      type: "number",
    },
    ...Array.from({ length: responses.numTasks || 0 }, (_, i) => [
      {
        key: `task-${i + 1}-desc`,
        text: `Task ${i + 1}: Enter task description:`,
        type: "text",
      },
      {
        key: `task-${i + 1}-priority`,
        text: `Task ${i + 1}: Enter task priority (1 = lowest, 5 = highest):`,
        type: "number",
      },
    ]).flat(),
    {
      key: "addBreaks",
      text: "Do you want to add any break activities? (yes/no)",
      type: "text",
    },
    ...(responses.addBreaks === "yes"
      ? [
          {
            key: "numBreaks",
            text: "Enter the number of break activities:",
            type: "number",
          },
          ...Array.from({ length: responses.numBreaks || 0 }, (_, i) => ({
            key: `break-${i + 1}`,
            text: `Break Activity ${i + 1}: Enter break activity description:`,
            type: "text",
          })),
        ]
      : []),
    {
      key: "dayDescription",
      text: "Describe how you want your day to be:",
      type: "text",
    },
  ];

  // Get current questions
  const questions = generateQuestions();

  const handleNext = (key, value) => {
    setResponses((prev) => {
      let newData = { ...prev };

      if (key === "numTasks") {
        newData.numTasks = parseInt(value) || 0;
        newData.tasks = [];
      } else if (key.startsWith("task-") && key.endsWith("-desc")) {
        const index = parseInt(key.split("-")[1]) - 1;
        newData.tasks[index] = {
          task_description: value,
          task_no: index + 1,
          start_time: "",
          expected_end_time: "",
          task: value,
        };
      } else if (key.startsWith("task-") && key.endsWith("-priority")) {
        const index = parseInt(key.split("-")[1]) - 1;
        if (newData.tasks[index]) {
          newData.tasks[index].priority = parseInt(value) || null;
        }
      } else if (key === "addBreaks") {
        newData.addBreaks = value.toLowerCase();
        if (newData.addBreaks === "no") {
          newData.numBreaks = 0;
          newData.breaks = [];
        }
      } else if (key === "numBreaks") {
        newData.numBreaks = parseInt(value) || 0;
        newData.breaks = [];
      } else if (key.startsWith("break-")) {
        const index = parseInt(key.split("-")[1]) - 1;
        newData.breaks[index] = { activity: value };
      } else if (key === "dayDescription") {
        newData.dayDescription = value;
      }

      return newData;
    });

    setStep((prevStep) => prevStep + 1);
  };

  // Check if we've reached the end of questions
  useEffect(() => {
    const currentQuestions = generateQuestions();
    if (step >= currentQuestions.length && !isSubmitting && !isLoading && !showResults) {
      submitData();
    }
  }, [step, responses, isSubmitting, isLoading, showResults]);

  // Submit data to API
  const submitData = () => {
    setIsSubmitting(true);
    setIsLoading(true);

    // Format data to match backend expectations
    const user_schedule = {
      tasks: responses.tasks.slice(0, responses.numTasks).map((task) => ({
        task: task.task,
        task_description: task.task_description,
        task_no: task.task_no,
        priority: task.priority || 1,
        start_time: task.start_time,
        expected_end_time: task.expected_end_time,
      })),
      breaks: responses.breaks
        .slice(0, responses.numBreaks)
        .map((breakItem) => ({
          activity: breakItem.activity,
        })),
      day_description: responses.dayDescription,
    };

    const sendData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/autism/schedule_generate/",
          { user_schedule: JSON.stringify(user_schedule) },
          { headers: { "Content-Type": "application/json" } }
        );
        
        // Parse the Schedule string to get the schedule options
        const scheduleData = JSON.parse(response.data.Schedule);
        setScheduleOptions(scheduleData);
        setIsLoading(false);
        setShowResults(true);
      } catch (error) {
        console.error("Error sending data:", error);
        setIsLoading(false);
      }
    };

    sendData();
  };

  const handleScheduleSelect = (index) => {
    setSelectedSchedule(index);
  };

  const confirmScheduleSelection = () => {
    setScheduleConfirmed(true);
  };

  const handleTaskCheck = (taskIndex) => {
    if (selectedSchedule !== null && scheduleConfirmed) {
      setScheduleOptions(prevOptions => {
        const newOptions = [...prevOptions];
        const selectedOption = [...newOptions[selectedSchedule]];
        selectedOption[taskIndex] = {
          ...selectedOption[taskIndex],
          completed: !selectedOption[taskIndex].completed
        };
        newOptions[selectedSchedule] = selectedOption;
        return newOptions;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-lg bg-gray-100 mx-auto max-w-xl shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Generating your schedules...</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (showResults) {
    if (scheduleConfirmed && selectedSchedule !== null) {
      // Show only the selected schedule
      const selectedScheduleData = scheduleOptions[selectedSchedule];
      
      return (
        <div className="p-6 bg-gray-100 mx-auto max-w-2xl shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Daily Schedule</h2>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="space-y-4">
              {selectedScheduleData.map((task, taskIndex) => (
                <div 
                  key={`task-${taskIndex}`}
                  className={`p-4 rounded-md border-l-4 transition-all duration-200 ${
                    task.completed 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-white border-blue-500'
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => handleTaskCheck(taskIndex)}
                      className="mt-1 h-5 w-5 text-blue-600"
                      id={`task-check-${taskIndex}`}
                    />
                    <label 
                      htmlFor={`task-check-${taskIndex}`}
                      className="ml-3 flex-1 cursor-pointer"
                    >
                      <div className={`font-medium text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.task}
                      </div>
                      <div className="text-sm font-medium text-gray-600 mt-1">
                        <span className="inline-block mr-3 px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {task.start_time} - {task.expected_end_time}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        {task.task_description}
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-blue-50 p-4 rounded-lg inline-block">
                <div className="text-sm font-medium text-blue-800">
                  Progress: {selectedScheduleData.filter(task => task.completed).length} / {selectedScheduleData.length} tasks completed
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(selectedScheduleData.filter(task => task.completed).length / selectedScheduleData.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Show all options for selection
    return (
      <div className="p-6 bg-gray-100 mx-auto max-w-4xl shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Schedule</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scheduleOptions.map((schedule, scheduleIndex) => (
            <div 
              key={`schedule-${scheduleIndex}`}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedSchedule === scheduleIndex 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50/30'
              }`}
              onClick={() => handleScheduleSelect(scheduleIndex)}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Option {scheduleIndex + 1}</h3>
                <input
                  type="radio"
                  name="schedule"
                  checked={selectedSchedule === scheduleIndex}
                  onChange={() => handleScheduleSelect(scheduleIndex)}
                  className="h-5 w-5 text-blue-600"
                />
              </div>
              
              <div className="space-y-3">
                {schedule.map((task, taskIndex) => (
                  <div 
                    key={`task-${scheduleIndex}-${taskIndex}`}
                    className="p-2 bg-white rounded-md"
                  >
                    <div className="font-medium">
                      {task.task}
                    </div>
                    <div className="text-xs text-gray-600">
                      {task.start_time} - {task.expected_end_time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            className={`px-6 py-3 rounded-md font-medium ${
              selectedSchedule !== null 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
            disabled={selectedSchedule === null}
            onClick={confirmScheduleSelection}
          >
            Confirm Schedule {selectedSchedule !== null ? selectedSchedule + 1 : ''}
          </button>
        </div>
      </div>
    );
  }

  // Only render QuestionCard if there are questions and we're within bounds
  if (questions.length > 0 && step < questions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <QuestionCard
          question={questions[step].text}
          type={questions[step].type}
          onNext={(value) => handleNext(questions[step].key, value)}
        />
      </div>
    );
  }

  // Safety fallback
  return (
    <div className="p-6 text-lg bg-gray-100 mx-auto max-w-xl shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Processing your request...</h2>
    </div>
  );
};

export default TaskManager;