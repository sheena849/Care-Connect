// src/api.js
const API_URL = 'http://localhost:5000'; // Adjust this to your backend URL

export const signup = async (data) => {
    const response = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

export const login = async (data) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Add more API functions for Patients, Appointments, Hospitals, and UserHospitals