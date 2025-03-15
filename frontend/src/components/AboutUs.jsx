import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">About NeuroSphereAI</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        <strong>NeuroSphereAI</strong> is a technology-driven initiative dedicated to empowering neurodiverse individuals by creating **accessible, innovative, and scalable solutions**. 
        We focus on addressing the challenges faced by individuals with **autism, ADHD, dyslexia, and other cognitive differences** by offering tools that enhance **education, employment opportunities, and daily life activities**.
      </p>

      <h2 className="text-2xl font-semibold text-blue-500 mt-8">Our Mission</h2>
      <p className="text-gray-700 mt-2 leading-relaxed">
        Our mission is to foster a more **inclusive world** where neurodiverse individuals can **thrive independently**. We believe that **technology can bridge gaps** by removing barriers in education and employment, 
        providing tailored support, and enabling people to develop skills that lead to success in various aspects of life.
      </p>

      <h2 className="text-2xl font-semibold text-blue-500 mt-8">How We Make a Difference</h2>
      <p className="text-gray-700 mt-2 leading-relaxed">
        At **NeuroSphereAI**, we design AI-powered tools and digital platforms that **enhance learning experiences, increase job opportunities, and support everyday tasks**. 
        Our solutions help neurodiverse individuals **overcome challenges, develop new skills, and gain independence** in ways that suit their unique needs.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="bg-blue-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">📚 Education</h3>
          <p className="text-gray-700 mt-2 leading-relaxed">
            We develop AI-assisted learning tools that adapt to different cognitive styles, making **studying, comprehension, and retention easier**. 
            Whether it's visual aids, interactive content, or assistive reading tools, our platform ensures **accessible education** for all.
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">💼 Employment</h3>
          <p className="text-gray-700 mt-2 leading-relaxed">
            Finding and maintaining a job can be challenging for neurodiverse individuals. We provide **career development resources, AI-driven job matching, and workplace accommodations** to create **inclusive work environments**.
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">🏡 Daily Life</h3>
          <p className="text-gray-700 mt-2 leading-relaxed">
            From **task organization apps** to **assistive communication tools**, we develop solutions that make daily life smoother and **promote independence** for neurodiverse individuals.
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded-md shadow-md">
          <h3 className="text-xl font-semibold text-blue-600">🤝 Advocacy & Awareness</h3>
          <p className="text-gray-700 mt-2 leading-relaxed">
            We work with **educators, employers, and organizations** to **spread awareness** about neurodiversity and promote **acceptance and support** in society.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mt-8">Join Us in Building a More Inclusive Future</h2>
      <p className="text-gray-700 mt-2 leading-relaxed">
        NeuroSphereAI believes that **everyone deserves equal opportunities** to succeed, regardless of neurological differences. 
        Whether you're a developer, educator, employer, or advocate, you can be a part of this movement. Together, let's create a world where **neurodiverse individuals can thrive with confidence**.
      </p>
    </div>
  );
};

export default AboutUs;
