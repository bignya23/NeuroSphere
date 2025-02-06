
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./components/Singup"
import Login from "./components/Login"

import Chat from './components/Chat';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_id');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
      
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
 
      </Routes>
    </Router>
  );
};

export default App;