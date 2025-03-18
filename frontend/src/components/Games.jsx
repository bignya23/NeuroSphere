import React from "react";

const Games = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <iframe
        src="https://dynamic-sorbet-93f152.netlify.app/"
        title="Embedded Game"
        className="w-full h-full"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Games;
