<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import DashboardRoutes from "./components/DashboardRoutes";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("access_token");
=======

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./components/Singup"
import Login from "./components/Login"

import Chat from './components/Chat';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_id');
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard/*" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="*" element={<DashboardRoutes />} /> {/* Load DashboardRoutes */}
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
=======
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
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
