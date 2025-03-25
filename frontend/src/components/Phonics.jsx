import React from "react";
import FontConversion from "./FontConversion";

const Phonics = () => {
  const handleSubmit = (e)=>{
    e.PreventDefault();
    console.log("clicked")
  }
  return (
    <div>
      <p className="text-lg text-gray-700">
       <FontConversion />
       
      </p>
    </div>
  );
};

export default Phonics;
