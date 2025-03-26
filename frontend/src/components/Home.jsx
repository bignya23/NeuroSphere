import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from './Footer';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate-fadeIn');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="">
      <Hero />
      <WhatWeDo />
      </div>
      <Footer />
    </div>
  );
};

const Hero = () => {
  const heroImages = [
    '/hero.jpg',
    '/hero.jpg',
    '/hero.jpg'
  ];

  return (
    <section className="relative bg-white flex flex-col items-center min-h-screen w-full">
      {/* Image Carousel with Fade Effect */}
      <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={1000}
          stopOnHover={false}
          swipeable={true}
          emulateTouch={true}
          dynamicHeight={false}
          className="carousel-container"
          renderIndicator={(onClickHandler, isSelected, index, label) => (
            <li
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
              className={`inline-block w-3 h-3 mx-1 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          )}
        >
          {heroImages.map((image, index) => (
            <div key={index} className="w-full h-[50vh] md:h-[70vh]">
              <img 
                src={image} 
                alt={`Hero ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Text Content Section with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full px-6 text-center mt-8 md:mt-12"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          <span className="text-blue-600">We are a community</span> where everybody understands<br className="hidden md:block" /> Autism and ADHD
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
        >
          We're the voice that campaigns for change. We're the specialists who provide training and world-class support. 
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl text-gray-700 font-medium"
        >
          Most importantly, we're a friend you can call on for help.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10"
        >
          <a 
            href="/about" 
            className="px-8 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            About us
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

const WhatWeDo = () => {
  const services = [
    {
      title: "Simple support for the everyday",
      description: "We offer support not just for those who are diagnosed, but the wider community.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      link: "/support",
      buttonText: "View support"
    },
    {
      title: "Training that makes a difference",
      description: "We offer training in all areas that fall under the banner of Neurodivergence.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      link: "/training",
      buttonText: "View training"
    },
    {
      title: "Community events",
      description: "Join our inclusive events designed with neurodiverse needs in mind.",
      image: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      link: "/events",
      buttonText: "View events"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center p-6 md:p-12 bg-gradient-to-b from-white to-blue-50">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
      >
        How We Can Help
      </motion.h2>

      <div className="w-full max-w-6xl space-y-16 md:space-y-24">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 scroll-animate`}
          >
            <div className="w-full md:w-1/2 h-64 md:h-96 overflow-hidden rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-500">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                {service.description}
              </p>
              <a
                href={service.link}
                className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition hover:shadow-lg"
              >
                {service.buttonText}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Resources Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24 w-full max-w-4xl bg-white p-8 rounded-xl shadow-md scroll-animate"
      >
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Additional Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Guides", icon: "📚", link: "/guides" },
            { title: "FAQs", icon: "❓", link: "/faqs" },
            { title: "Contact", icon: "✉️", link: "/contact" }
          ].map((item, i) => (
            <a 
              key={i}
              href={item.link}
              className="flex flex-col items-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-300 transform hover:-translate-y-1"
            >
              <span className="text-4xl mb-3">{item.icon}</span>
              <span className="text-xl font-medium text-gray-800">{item.title}</span>
            </a>
          ))}
          
        </div>
        
      </motion.div>


    </div>
  );
};

export default Home;