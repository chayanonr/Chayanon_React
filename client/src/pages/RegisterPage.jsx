import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://chayanonrod.onrender.com/api/register', formData);
      alert(response.data.message);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Your Password"
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Login here
          </span>.
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
