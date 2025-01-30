// src/services/hospitalService.js
import axios from 'axios';

// Define the API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Fetch all hospitals
export const getHospitals = async () => {
  try {
    const response = await axios.get(`${API_URL}/hospitals/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    throw new Error(error.response ? error.response.data.message : 'Error fetching hospitals');
  }
};

// Create a new hospital
export const createHospital = async (hospitalData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/hospitals/`,
      hospitalData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating hospital:', error);
    throw new Error(error.response ? error.response.data.message : 'Error creating hospital');
  }
};

// Update a hospital by ID
export const updateHospital = async (hospitalId, hospitalData, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/hospitals/${hospitalId}`,
      hospitalData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating hospital:', error);
    throw new Error(error.response ? error.response.data.message : 'Error updating hospital');
  }
};

// Delete a hospital by ID
export const deleteHospital = async (hospitalId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/hospitals/${hospitalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting hospital:', error);
    throw new Error(error.response ? error.response.data.message : 'Error deleting hospital');
  }
};
