import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.auth.getUser);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching user info:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post(API_PATHS.auth.login, {
        email,
        password,
      });
      
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const response = await axiosInstance.post(API_PATHS.auth.register, {
        fullName,
        email,
        password,
      });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        fetchUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
