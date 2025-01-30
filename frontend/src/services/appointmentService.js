// src/services/appointmentService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const handleError = (error) => {
  console.error("Error in appointment service:", error);
  // Return a more specific error message
  if (error.response) {
    return error.response.data.message || 'An error occurred while processing your request.';
  } else if (error.request) {
    return 'No response received from the server.';
  } else {
    return `Error: ${error.message}`;
  }
};

// Create appointment
export const createAppointment = async (appointmentData, token) => {
  try {
    const response = await axios.post(`${API_URL}/appointments/`, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error)); // Propagate the error message
  }
};

// Get appointments by user
export const getAppointmentsByUser = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This should return an array of appointments
  } catch (error) {
    throw new Error(handleError(error)); // Propagate the error message
  }
};

// Get appointments by patient
export const getAppointmentsByPatient = async (patientId, token) => {
  try {
    const response = await axios.get(`${API_URL}/appointments/patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error)); // Propagate the error message
  }
};

// Update appointment
export const updateAppointment = async (appointmentId, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/appointments/${appointmentId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error)); // Propagate the error message
  }
};

// Delete appointment
export const deleteAppointment = async (appointmentId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleError(error)); // Propagate the error message
  }
};
