import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitDoubt from "./pages/SubmitDoubt";
import MyDoubts from "./pages/MyDoubts";
import TeacherDashboard from "./pages/TeacherDashboard";
import Heatmap from "./pages/HeatMap";
import Register from "./pages/Register";
import ViewDoubts from "./pages/ViewDoubts";
import SubjectAnalytics from "./pages/SubjectAnalytics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/submit-doubt" element={<SubmitDoubt />} />
      <Route path="/my-doubts" element={<MyDoubts />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/heatmap" element={<Heatmap />} />
      <Route path="/register" element={<Register />} />
      <Route path="/view-doubts" element={<ViewDoubts />} />
      <Route path="/view-doubts" element={<SubjectAnalytics />} />
    </Routes>

  );
}

export default App;