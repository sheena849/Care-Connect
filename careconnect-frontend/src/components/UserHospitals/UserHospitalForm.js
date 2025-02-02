// src/components/UserHospitals/UserHospitalForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const UserHospitalForm = () => {
    const [userId, setUserId] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const userHospital = location.state?.userHospital; // Get the user-hospital data from the state

    useEffect(() => {
        if (userHospital) {
            setUserId(userHospital.user_id);
            setHospitalId(userHospital.hospital_id);
            setStatus(userHospital.status);
        }
    }, [userHospital]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
            if (userHospital) {
                // If user-hospital relationship exists, update it
                await axios.put(`http://localhost:5000/userhospital/${userHospital.id}`, 
                    { status }, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('User -Hospital relationship updated:', userHospital.id);
            } else {
                // If no user-hospital relationship exists, create a new one
                await axios.post('http://localhost:5000/userhospital/', 
                    { user_id: userId, hospital_id: hospitalId, status }, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('User -Hospital relationship created');
            }
            navigate('/user-hospitals'); // Redirect to the user-hospital list after submission
        } catch (err) {
            console.error('Error saving user-hospital relationship:', err);
            setError(err.response?.data?.error || 'An error occurred while saving the relationship.');
        }
    };

    return (
        <div>
            <h2>{userHospital ? 'Edit User-Hospital Relationship' : 'Add User-Hospital Relationship'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User  ID"
                    required
                />
                <input
                    type="text"
                    value={hospitalId}
                    onChange={(e) => setHospitalId(e.target.value)}
                    placeholder="Hospital ID"
                    required
                />
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Status"
                />
                <button type="submit">{userHospital ? 'Update Relationship' : 'Add Relationship'}</button>
            </form>
        </div>
    );
};

export default UserHospitalForm;