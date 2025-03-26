import React from "react";

const QuestionCard = ({ question, type, onNext, currentValue, setCurrentValue }) => {
  const handleSubmit = () => {
    if (currentValue.trim() !== "") {
      onNext(currentValue);
    }
  };

  return (
    <div className="w-[400px] h-[250px] flex flex-col justify-between mx-auto bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <div className="border-b pb-2 mb-2 w-full">
        <p className="text-lg font-semibold">Question</p>
      </div>
      <p className="text-gray-700 font-medium mb-2 overflow-auto">{question}</p>
      <input
        type={type}
        className="w-full p-2 rounded-sm border border-gray-300 bg-gray-100"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg self-end"
        onClick={handleSubmit}
      >
        Next
      </button>
    </div>
  );
};

export default QuestionCard;