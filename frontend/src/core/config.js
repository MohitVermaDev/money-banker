// src/core/config.js

export const API_BASE_URL = 'http://192.168.1.35:8000';

// Function to get Auth Headers dynamically
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};
