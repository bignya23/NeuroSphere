import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Support = () => {
  const [emergencyData, setEmergencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://127.0.0.1:8000/api/autism/emergency/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmergencyData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch emergency data.');
        setLoading(false);
      }
    };

    fetchEmergencyData();
  }, []);

  const sendSOS = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:8000/api/autism/sos/', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('SOS alert sent successfully!');
    } catch (err) {
      alert('Failed to send SOS alert.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col h-[100vh] w-full p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Support</h1>

      <h2 className="text-2xl font-semibold mb-4">Emergency Contacts</h2>
      <ul>
        {emergencyData?.emergency_contacts.map((contact) => (
          <li key={contact.id} className="mb-2">
            {contact.name} ({contact.type}) - {contact.contact}
          </li>
        ))} 
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Nearest Hospitals</h2>
      <ul>
        {emergencyData?.nearest_hospitals.map((hospital) => (
          <li key={hospital.id} className="mb-2">
            {hospital.name} - {hospital.location} - {hospital.contact} - <a href={hospital.navigation_link} className="text-blue-500 underline">Navigate</a>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">My Doctors</h2>
      <ul>
       {emergencyData?.my_doctors.map((doctor) => (
          <li key={doctor.id} className="mb-2">
            Dr. {doctor.name} ({doctor.specialty}) - {doctor.contact} - {doctor.location}
          </li>
        ))} 
      </ul>

      <button
        onClick={sendSOS}
        className="mt-8 w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition"
      >
        🚨 Send SOS Alert
      </button>
    </div>
  );
};

export default Support;