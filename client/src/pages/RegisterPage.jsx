import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      alert(response.data.message);
      navigate('/login'); // Redirect to dashboard after successful login
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
