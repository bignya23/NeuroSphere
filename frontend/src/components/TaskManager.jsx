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

  const questions = [
    { key: "numTasks", text: "Enter the number of tasks you have:", type: "number" },
    ...Array.from({ length: responses.numTasks || 0 }, (_, i) => [
      { key: `task-${i + 1}-desc`, text: `Task ${i + 1}: Enter task description:`, type: "text" },
      { key: `task-${i + 1}-priority`, text: `Task ${i + 1}: Enter task priority (1 = lowest, 5 = highest):`, type: "number" },
    ]).flat(),
    { key: "addBreaks", text: "Do you want to add any break activities? (yes/no)", type: "text" },
    ...(responses.addBreaks === "yes"
      ? [
          { key: "numBreaks", text: "Enter the number of break activities:", type: "number" },
          ...Array.from({ length: responses.numBreaks || 0 }, (_, i) => ({
            key: `break-${i + 1}`,
            text: `Break Activity ${i + 1}: Enter break activity description:`,
            type: "text",
          })),
        ]
      : []),
    { key: "dayDescription", text: "Describe how you want your day to be:", type: "text" },
  ];

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
          task: value 
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

  // Send Data to API when all questions are answered
  useEffect(() => {
    if (step >= questions.length && !isSubmitting) {
      setIsSubmitting(true);

      // Format data to match backend expectations
      const finalData = {
        tasks: responses.tasks.slice(0, responses.numTasks).map(task => ({
          task: task.task,
          task_description: task.task_description,
          task_no: task.task_no,
          priority: task.priority || 1,
          start_time: task.start_time,
          expected_end_time: task.expected_end_time
        })),
        breaks: responses.breaks.slice(0, responses.numBreaks).map(breakItem => ({
          activity: breakItem.activity
        })),
        day_description: responses.dayDescription,
      };

      console.log("Final Response Object:", finalData);

      const sendData = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/autism/schedule_generate",
            finalData,
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("API Response:", response.data);
        } catch (error) {
          console.error("Error sending data:", error);
        }
      };

      sendData();
    }
  }, [step, questions.length, responses, isSubmitting]);

  if (step >= questions.length) {
    return (
      <div className="p-6 text-lg bg-gray-100 mx-auto max-w-xl shadow-md rounded-md">
        <h2 className="text-xl font-bold mb-4">Responses have been submitted. Check the console.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <QuestionCard
        question={questions[step].text}
        type={questions[step].type}
        onNext={(value) => handleNext(questions[step].key, value)}
      />
    </div>
  );
};

export default TaskManager;