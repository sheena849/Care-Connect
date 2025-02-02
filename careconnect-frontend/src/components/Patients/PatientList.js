// src/components/Patients/PatientList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
                const response = await axios.get('http://localhost:5000/patients/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatients(response.data);
            } catch (err) {
                console.error('Error fetching patients:', err);
                setError(err.response?.data?.error || 'An error occurred');
            }
        };

        fetchPatients();
    }, []);

    const handleEdit = (patient) => {
        // Navigate to the PatientForm with the patient's data
        navigate('/edit-patient', { state: { patient } });
    };

    const handleDelete = async (patientId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
                await axios.delete(`http://localhost:5000/patients/${patientId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Remove the deleted patient from the state
                setPatients(patients.filter(patient => patient.id !== patientId));
                alert('Patient deleted successfully');
            } catch (err) {
                console.error('Error deleting patient:', err);
                setError(err.response?.data?.error || 'An error occurred while deleting the patient');
            }
        }
    };

    return (
        <div>
            <h2>Patient List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        {patient.name}
                        <button onClick={() => handleEdit(patient)}>Edit</button>
                        <button onClick={() => handleDelete(patient.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;