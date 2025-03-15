import React from "react";

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        Have questions, suggestions, or want to collaborate with us? We'd love to hear from you! 
        Reach out to **NeuroSphereAI** through the form below or via our contact details.
      </p>

      <div className="mt-8 text-left">
        <form className="bg-white p-6 rounded-lg shadow-md">
          <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block text-gray-700 font-semibold mt-4 mb-2">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block text-gray-700 font-semibold mt-4 mb-2">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-md mt-6 hover:bg-blue-700 transition duration-300">
            Send Message
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mt-8">Other Ways to Reach Us</h2>
      <div className="mt-4 text-gray-700">
        <p>📍 <strong>Address:</strong> 123 Innovation Street, Tech City, USA</p>
        <p>📞 <strong>Phone:</strong> +1 (123) 456-7890</p>
        <p>📧 <strong>Email:</strong> support@neurosphereai.com</p>
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mt-8">Follow Us</h2>
      <div className="flex justify-center gap-6 mt-4">
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">
          🌐 Website
        </a>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">
          📘 Facebook
        </a>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">
          🐦 Twitter
        </a>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">
          📸 Instagram
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
