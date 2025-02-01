

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});


// Example function to create an appointment
export const createAppointment = (data) => {
  return api.post('/appointments', data);
};

// Example function to get user data
export const getUserData = () => {
  return api.get('/users');
};

// Add more functions for Patients, Hospitals, User-Hospital etc.
