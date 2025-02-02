// src/components/Appointments/AppointmentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const appointment = location.state?.appointment; // Get the appointment data from the state

    useEffect(() => {
        if (appointment) {
            setDate(appointment.date);
            setDescription(appointment.description);
        }
    }, [appointment]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Validate user ID
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User  ID is not available. Please log in again.');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
            if (appointment) {
                // If appointment exists, update the appointment
                await axios.put(`http://localhost:5000/appointments/${appointment.id}`, 
                    { date, description }, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('Appointment updated:', appointment.id);
            } else {
                // If no appointment exists, create a new one
                await axios.post('http://localhost:5000/appointments/', 
                    { date, user_id: userId, description }, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('Appointment created');
            }
            navigate('/appointments'); // Redirect to the appointment list after submission
        } catch (err) {
            console.error('Error saving appointment:', err);
            setError(err.response?.data?.error || 'An error occurred while saving the appointment.');
        }
    };

    return (
        <div>
            <h2>{appointment ? 'Edit Appointment' : 'Add Appointment'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                <button type="submit">{appointment ? 'Update Appointment' : 'Add Appointment'}</button>
            </form>
        </div>
    );
};

export default AppointmentForm;