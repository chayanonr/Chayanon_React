import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import


const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role) {
    try {
      const decoded = jwtDecode(token); // Decode the JWT to extract the user role
      if (decoded.role !== role) {
        alert('Access denied!');
        return <Navigate to="/" />;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default ProtectedRoute;
