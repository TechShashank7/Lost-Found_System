import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedInfo = JSON.parse(userInfo);
      // Check if token is expired
      try {
        const decoded = jwtDecode(parsedInfo.token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(parsedInfo);
          // Set axios default auth header
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsedInfo.token}`;
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
        {children}
    </AuthContext.Provider>
  );
};
