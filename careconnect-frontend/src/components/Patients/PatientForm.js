// src/components/Patients/PatientForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PatientForm = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const patient = location.state?.patient; // Get the patient data from the state

    useEffect(() => {
        if (patient) {
            setName(patient.name); // Populate the form with existing patient data
        }
    }, [patient]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
            if (patient) {
                // If patient exists, update the patient
                await axios.put(`http://localhost:5000/patients/${patient.id}`, { name }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Patient updated:', patient.id);
            } else {
                // If no patient exists, create a new one
                await axios.post('http://localhost:5000/patients/', { name }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Patient added');
            }
            navigate('/patients'); // Redirect to the patient list after submission
        } catch (err) {
            console.error('Error saving patient:', err);
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>{patient ? 'Edit Patient' : 'Add Patient'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Patient Name"
                    required
                />
                <button type="submit">{patient ? 'Update Patient' : 'Add Patient'}</button>
            </form>
        </div>
    );
};

export default PatientForm;