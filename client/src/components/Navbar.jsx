import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null; // Decode JWT to get role

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              MyApp
            </Link>
            <div className="hidden md:flex ml-10 space-x-4"> {/* Hidden on small screens */}
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              {token && userRole === 'user' && (
                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              )}
              {token && userRole === 'admin' && (
                <Link to="/admin-dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Admin Panel
                </Link>
              )}
              {!token && (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          {token && (
            <button
              onClick={handleLogout}
              className="hidden md:block bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          )}
          <div className="md:hidden"> {/* Mobile menu button */}
            <button
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              aria-label="Open menu"
            >
              {/* Hamburger menu icon */}
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
