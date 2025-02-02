import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
                const response = await axios.get('http://localhost:5000/hospitals/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHospitals(response.data);
            } catch (err) {
                console.error('Error fetching hospitals:', err);
                setError(err.response?.data?.error || 'An error occurred');
            }
        };

        fetchHospitals();
    }, []);

    const handleEdit = (hospital) => {
        // Navigate to the HospitalForm with the hospital's data
        navigate('/edit-hospital', { state: { hospital } });
    };

    const handleDelete = async (hospitalId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this hospital?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
                await axios.delete(`http://localhost:5000/hospitals/${hospitalId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Remove the deleted hospital from the state
                setHospitals(hospitals.filter(hospital => hospital.id !== hospitalId));
                alert('Hospital deleted successfully');
            } catch (err) {
                console.error('Error deleting hospital:', err);
                setError(err.response?.data?.error || 'An error occurred while deleting the hospital');
            }
        }
    };

    return (
        <div>
            <h2>Hospital List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {hospitals.map((hospital) => (
                    <li key={hospital.id}>
                        {hospital.name} - {hospital.location}
                        <button onClick={() => handleEdit(hospital)}>Edit</button>
                        <button onClick={() => handleDelete(hospital.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HospitalList;