import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard"; // Import other components
import LoginPage from "./pages/LoginPage";
import Home from "./app/page";

function App() {
  // Check if a user is authenticated by checking localStorage
  const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    return user !== null;
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
