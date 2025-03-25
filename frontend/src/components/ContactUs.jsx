import React from "react";

const ContactUs = () => {
  return (
    <div className="w-full bg-gray-50 text-center py-16">
      <h1 className="text-5xl font-bold text-blue-600 mb-12">Contact Us</h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full px-8">
        <div className="md:w-1/2">
          <img src="/hero.jpg" alt="Call Center" className="rounded-lg shadow-lg w-full" />
        </div>
        <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Have questions, suggestions, or want to collaborate with us? We'd love to hear from you! 
            Reach out to <strong>NeuroSphereAI</strong> through the form below or via our contact details.
          </p>
          <form className="bg-white p-8 rounded-lg shadow-md">
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
      </div>

      <h2 className="text-4xl font-semibold text-blue-500 mt-16">Other Ways to Reach Us</h2>
      <div className="mt-8 text-gray-700">
        <p>📍 <strong>Address:</strong> 123 Innovation Street, Tech City, USA</p>
        <p>📞 <strong>Phone:</strong> +1 (123) 456-7890</p>
        <p>📧 <strong>Email:</strong> support@neurosphereai.com</p>
      </div>

      <h2 className="text-4xl font-semibold text-blue-500 mt-16">Follow Us</h2>
      <div className="flex justify-center gap-8 mt-8">
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">🌐 Website</a>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">📘 Facebook</a>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">🐦 Twitter</a>
        <a href="#" className="text-blue-600 hover:text-blue-800 text-3xl">📸 Instagram</a>
      </div>

      {/* Smooth Scroll Effect */}
      <script>
        {`
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
              });
            });
          });
        `}
      </script>
    </div>
  );
};

export default ContactUs;