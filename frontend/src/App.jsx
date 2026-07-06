import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ FIX

// Dashboards
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* ROLE PROTECTED ROUTES */}

        {/* Candidate ONLY */}
        <Route
          path="/candidate-dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["candidate"]}>
              <CandidateDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* Recruiter ONLY */}
        <Route
          path="/recruiter-dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;