import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import DashboardRoutes from "./components/DashboardRoutes";
import ResumeInput from "./components/ResumeInput";
import Home from "./components/Home";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import AboutUs from "./components/AboutUs";
import Navbar from "./miniComponents/Navbar";
import ContactUs from "./components/ContactUs";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Context);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/auth/check-auth/",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    }

    checkAuth();

    // Optionally, recheck auth status every few minutes
    const interval = setInterval(checkAuth, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="*" element={<DashboardRoutes />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
