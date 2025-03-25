import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About NeuroSphereAI</h2>
          <p className="text-gray-400">We empower neurodiverse individuals by offering educational resources and connecting them with inclusive job opportunities.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="text-gray-400">
            <li className="mb-2"><a href="/about" className="hover:text-white">About Us</a></li>
            <li className="mb-2"><a href="/jobs" className="hover:text-white">Job Portal</a></li>
            <li className="mb-2"><a href="/education" className="hover:text-white">Education Hub</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: <a href="mailto:support@neurosphereai.com" className="hover:text-white">support@neurosphereai.com</a></p>
          <p className="text-gray-400">Phone: <a href="tel:+18001234567" className="hover:text-white">+1 (800) 123-4567</a></p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-gray-400">&copy; 2025 NeuroSphereAI. Empowering Neurodiverse Talent.</p>
      </div>
    </footer>
  );
};

export default Footer;