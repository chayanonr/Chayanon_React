import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Protected route for user dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Protected route for admin dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
