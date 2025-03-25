import React, { useState } from "react";
import axios from "axios";
const FontConversion = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setDownloadUrl(null);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("pdf_file", selectedFile);

    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/dyslexia/font_conversion/", formData, {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (err) {
      console.error("Error during font conversion:", err);
      setError("An error occurred during font conversion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">PDF Font Conversion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} `}
          >
            {loading ? "Converting..." : "Convert PDF"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {downloadUrl && (
          <div className="mt-6 text-center">
            <a 
              href={downloadUrl} 
              download="converted_pdf.pdf" 
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Download Converted PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FontConversion;