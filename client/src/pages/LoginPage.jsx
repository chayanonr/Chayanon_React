import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token); // Save token to localStorage

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
