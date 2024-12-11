import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              MyApp
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded">
              Home
            </Link>
            {!token ? (
              <>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Login
                </Link>
                <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/projects" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Projects
                </Link>
                <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-700 bg-red-600 px-3 py-2 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-gray-300"
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden bg-blue-500 md:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <Link to="/" className="hover:bg-blue-700 block px-3 py-2 rounded">
            Home
          </Link>
          {!token ? (
            <>
              <Link to="/login" className="hover:bg-blue-700 block px-3 py-2 rounded">
                Login
              </Link>
              <Link to="/register" className="hover:bg-blue-700 block px-3 py-2 rounded">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:bg-blue-700 block px-3 py-2 rounded">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-red-700 bg-red-600 block w-full px-3 py-2 rounded text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
