import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chatbot from "./Chatbot";
import VoiceAgent from "./VoiceAgent";
import TaskManager from "./TaskManager";
import Games from "./Games";
import Chat from "./Chat";
import Employment from "./Employment";
import ResumeInput from "./ResumeInput";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="chatbot" element={<Chatbot />} />
      <Route path="voice" element={<VoiceAgent />} />
      <Route path="employment" element={<Employment />} />
      <Route path="tasks" element={<TaskManager />} />
      <Route path="resume" element={<ResumeInput />} />
      <Route path="community-chat" element={<Chat />} />
    </Routes>
  );
};

export default DashboardRoutes;
