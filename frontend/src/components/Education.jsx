import React, { useContext, useState } from "react";
import { Context } from "../main";
import Phonics from "./Phonics";
import Podcast from "./Podcast";

const Education = () => {
  const [activeTab, setActiveTab] = useState("podcast");
  const { user } = useContext(Context);
  console.log(user.disease);
  return (
    <div className="flex flex-col w-full h-screen">
      {/* Tabs Navigation */}
      <div className="flex justify-around border-b mb-4 p-4 bg-white">
       

        <button
          className={`p-2 ${
            activeTab === "podcast"
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("podcast")}
        >
          Podcast
        </button>
        {user.disease == "Dyslexia" ? (
          <button
            className={`p-2 ${
              activeTab === "phonics"
                ? "border-b-2 border-blue-500 font-bold"
                : ""
            }`}
            onClick={() => setActiveTab("phonics")}
          >
            Font Conversion
          </button>
        ) : (
          ""
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1">
        {activeTab === "podcast" ? (
          <Podcast />
        ) : (
          <div className="flex items-center justify-center h-full p-6">
            <Phonics />
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
