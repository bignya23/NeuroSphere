import React from "react";

const WhatWeDo = () => {
  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Support Section */}
      <div className="w-full max-w-4xl">
        <div className="relative w-full h-auto overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src="https://images.squarespace-cdn.com/content/v1/61fbe5f441ae240910b66845/e8070cf5-22fb-46cb-87c2-fefa98749bd2/image-asset.jpeg"
            alt="Family gathered around kitchen island"
          />
        </div>
      </div>
      <div className="w-full max-w-4xl text-center mt-6">
        <h2 className="text-2xl font-semibold">Simple support for the everyday</h2>
        <p className="mt-4 text-lg text-gray-700">
          We offer support not just for those who are diagnosed, but the wider community.
        </p>
        <div className="mt-6">
          <a
            href="/support"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            View support
          </a>
        </div>
      </div>
      
      {/* Training Section */}
      <div className="w-full max-w-4xl mt-12">
        <div className="relative w-full h-96 overflow-hidden rounded-lg">
          <a href="/training" className="block w-full h-full">
            <img
              src="https://images.squarespace-cdn.com/content/v1/61fbe5f441ae240910b66845/947190c5-2ebe-407b-85a4-654c4cf08a83/pexels-christina-morillo-1181472.jpg"
              alt="Two ladies collaborating at a work station"
              className="w-full h-full object-cover object-center"
            />
          </a>
        </div>
        <div className="text-center mt-6">
          <h2 className="text-2xl font-semibold">Training that makes a difference</h2>
          <p className="mt-4 text-lg text-gray-700">
            We offer training in all areas that fall under the banner of Neurodivergence.
          </p>
          <div className="mt-6">
            <a
              href="/training"
              className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition"
            >
              View training
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;