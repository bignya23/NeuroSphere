import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">About NeuroSphere</h2>
          <p className="text-gray-400">We empower neurodiverse individuals by offering educational resources and connecting them with inclusive job opportunities.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="text-gray-400">
            <li className="mb-2"><Link to="/about" className="hover:text-white">About Us</a></li>
            <li className="mb-2"><Link to="/jobs" className="hover:text-white">Job Portal</a></li>
            <li className="mb-2"><Link to="/education" className="hover:text-white">Education Hub</a></li>
            <li><Link to="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-400">Email: <Link to="mailto:neurosphere53@gmail.com" className="hover:text-white">neurosphere53@gmail.com</a></p>
          <p className="text-gray-400">Phone: <Link to="tel:+18001234567" className="hover:text-white">+1 (800) 123-4567</a></p>
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
