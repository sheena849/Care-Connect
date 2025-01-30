import axios from 'axios';

const API_URL =  'http://localhost:5000'; // Fallback if env variable is missing

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login'; // Redirect to login after logout
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;
