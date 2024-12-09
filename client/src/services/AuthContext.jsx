import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import axios from './axiosInstance';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Update the user state
    console.log('User logged in:', userData);
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout', {}, { withCredentials: true }); // Call backend logout endpoint
      setUser(null); // Clear user state
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/auth/user', { withCredentials: true });
        console.log('Fetched user:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);
  
  



  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
