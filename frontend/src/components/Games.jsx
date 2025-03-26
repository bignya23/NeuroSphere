import React from "react";
import BreathingCircle from "./BreathingCircle";

function Games() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-between p-8">
      <h1 className="text-4xl font-bold text-indigo-900 mb-8">Mindful Breathing</h1>
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-xl">
          <BreathingCircle />
        </div>
      </div>
      <p className="text-indigo-700 max-w-md text-center mt-4">
        Take a moment to breathe and find your center. Choose a breathing
        pattern and follow the visual guide.
      </p>
    </div>
  );
}

export default Games;
