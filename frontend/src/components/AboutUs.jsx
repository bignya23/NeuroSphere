import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const AboutUs = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-animate");
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
          element.classList.add("animate-fadeIn");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-blue-600 py-12 scroll-animate">About NeuroSphereAI</h1>

      <div className="flex flex-col md:flex-row items-center justify-center w-full px-8 py-16 scroll-animate">
        <motion.img 
          src="/about.jpg" 
          alt="Neurodiverse Community" 
          className="w-full md:w-1/2 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />
        <motion.p 
          className="text-lg text-gray-700 leading-relaxed md:pl-12"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <strong>NeuroSphereAI</strong> is a technology-driven initiative dedicated to empowering neurodiverse individuals by creating accessible, innovative, and scalable solutions.
          We focus on addressing the challenges faced by individuals with autism, ADHD, dyslexia, and other cognitive differences.
        </motion.p>
      </div>

      <div className="bg-blue-100 py-16 scroll-animate">
        <h2 className="text-4xl font-semibold text-blue-500">Our Mission</h2>
        <div className="flex flex-col md:flex-row items-center justify-center w-full px-8 py-12">
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed md:pr-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our mission is to foster a more inclusive world where neurodiverse individuals can thrive independently.
          </motion.p>
          <motion.img 
            src="/mission.jpg" 
            alt="Inclusive Education" 
            className="w-full md:w-1/2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
        </div>
      </div>

      <h2 className="text-4xl font-semibold text-blue-500 py-12 scroll-animate">How We Make a Difference</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-8 pb-16">
        {["Education", "Employment", "Daily Life", "Advocacy & Awareness"].map((section, index) => (
          <motion.div 
            key={index}
            className="flex items-center bg-blue-50 p-8 rounded-lg shadow-md scroll-animate"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img src="/edu.jpg" alt={section} className="w-1/3 rounded-lg" />
            <div className="pl-8">
              <h3 className="text-2xl font-semibold text-blue-600">{section}</h3>
              <p className="text-gray-700 leading-relaxed">We offer tailored solutions for {section.toLowerCase()} that enhance independence and improve quality of life.</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-900 text-white py-16 scroll-animate">
        <motion.h2 
          className="text-4xl font-semibold mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join Us in Building a More Inclusive Future
        </motion.h2>
        <motion.p 
          className="text-lg leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          NeuroSphereAI believes that everyone deserves equal opportunities to succeed, regardless of neurological differences. Join us on our mission for inclusion.
        </motion.p>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutUs;