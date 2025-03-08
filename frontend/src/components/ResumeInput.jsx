import React from "react";

const ResumeInput = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Your Resume
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Education</label>
            <input
              type="text"
              name="school"
              className="w-full p-2 border rounded-md"
              placeholder="Name of School"
              required
            />
            <input
              type="text"
              name="year"
              className="w-full p-2 border rounded-md mt-2"
              placeholder="Year of Studies"
              required
            />
            <input
              type="text"
              name="percentage"
              className="w-full p-2 border rounded-md mt-2"
              placeholder="Percentage"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Skills</label>
            <textarea
              name="skills"
              className="w-full p-2 border rounded-md"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Projects</label>
            {[1, 2, 3].map((index) => (
              <div key={index} className="mt-2">
                <input
                  type="text"
                  name={`project_title_${index}`}
                  className="w-full p-2 border rounded-md"
                  placeholder={`Project ${index} Title`}
                  required
                />
                <textarea
                  name={`project_description_${index}`}
                  className="w-full p-2 border rounded-md mt-2"
                  rows="3"
                  placeholder={`Project ${index} Description`}
                  required
                ></textarea>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-gray-700">Experience</label>
            <textarea
              name="experience"
              className="w-full p-2 border rounded-md"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Github Profile Link</label>
            <input
              type="url"
              name="github"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Create Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeInput;
