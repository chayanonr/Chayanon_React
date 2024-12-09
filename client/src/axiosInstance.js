import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Use environment variable or fallback to localhost
});

export default axiosInstance;
