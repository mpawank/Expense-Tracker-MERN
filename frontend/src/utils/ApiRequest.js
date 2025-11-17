// Use localhost in development, production URL in production
// Check if we're running on localhost (development) or production
const isDevelopment = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      process.env.NODE_ENV === 'development';

const host = isDevelopment 
  ? "http://localhost:5000"
  : process.env.REACT_APP_BACKEND_URL || "https://expense-tracker-app-knl1.onrender.com";

export const setAvatarAPI = `${host}/api/auth/setAvatar`;
export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;
export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;