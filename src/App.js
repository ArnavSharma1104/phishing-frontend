import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import EmailSimulator from "./pages/EmailSimulator";
import FakeLogin_old from "./pages/FakeLogin_old";
import FakeLogin from "./pages/FakeLogin";
import AdminPanel from "./pages/AdminPanel";
import CreateTemplate from "./pages/CreateTemplate";
import EmailTemplates from "./pages/EmailTemplates";

// Auth Route Guard
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-sim" element={<EmailSimulator />} />
        <Route path="/fake-login-old" element={<FakeLogin_old />} />
        <Route path="/fake-login" element={<FakeLogin />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-template"
          element={
            <ProtectedRoute adminOnly={true}>
              <CreateTemplate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute adminOnly={true}>
              <EmailTemplates />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
