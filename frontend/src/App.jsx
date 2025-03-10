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
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("access_token");
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<ResumeInput />} /> */}

          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}

          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="*" element={<DashboardRoutes />} />
          </Route>

          {/* 
          <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
