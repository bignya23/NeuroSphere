import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-white flex flex-col items-center min-h-screen w-full">
      {/* Image Section */}
      <div className="w-full">
        <img 
          src="/hero.jpg" 
          alt="Hero" 
          className="w-full h-[50vh] object-cover"
        />
      </div>

      {/* Text Content Section */}
      <div className="max-w-6xl w-full px-6 text-center mt-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          We are a community where everybody in the team understands Autism and ADHD
        </h1>
        
        <p className="mt-6 text-lg text-gray-700">
          We’re the voice that campaigns for change. We’re the specialists who provide training and world-class support. 
          But most importantly, we’re a friend you can call on for help.
        </p>

        <p className="mt-2 text-lg text-gray-700">Welcome to our community.</p>

        <div className="mt-8">
          <a 
            href="/about" 
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg transition duration-300"
          >
            About us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
