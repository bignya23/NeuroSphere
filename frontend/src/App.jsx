<<<<<<< HEAD
=======
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
>>>>>>> dbd363c93d388599e1b908b4ade2ecb271d44300

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from "./components/Singup"
import Login from "./components/Login"

import Chat from './components/Chat';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user_id');
<<<<<<< HEAD
=======
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
>>>>>>> dbd363c93d388599e1b908b4ade2ecb271d44300
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
<<<<<<< HEAD
=======
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
>>>>>>> dbd363c93d388599e1b908b4ade2ecb271d44300
    <Router>
      <Routes>
      
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
 
      </Routes>
    </Router>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> d5cd088afd3a660e8e692020b04f1969056278aa
>>>>>>> dbd363c93d388599e1b908b4ade2ecb271d44300
