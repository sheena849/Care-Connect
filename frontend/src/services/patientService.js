import axios from 'axios';

const API_URL =  'http://localhost:5000/patients/';

export const getAllPatients = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token; // Get token from localStorage
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPatient = async (patientData) => {
  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token; // Get token from localStorage
    const response = await axios.post(API_URL, patientData, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePatient = async (patientId, patientData) => {
  try {
    if (!patientId) {
      throw new Error('patientId is required');
    }

    const token = JSON.parse(localStorage.getItem('user'))?.token; // Get token from localStorage
    const response = await axios.put(`${API_URL}${patientId}`, patientData, {  // Fixed the URL construction
      headers: {
        Authorization: `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in updating patient:', error);
    throw error;
  }
};



export const deletePatient = async (patientId) => {
  try {
    if (!patientId) {
      throw new Error('patientId is required');
    }

    const token = JSON.parse(localStorage.getItem('user'))?.token; // Get token from localStorage
    const response = await axios.delete(`${API_URL}${patientId}`, {  // Fixed URL construction
      headers: {
        Authorization: `Bearer ${token}`,  // Add token to Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in deleting patient:', error);
    throw error;
  }
};

