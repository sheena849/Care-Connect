// src/components/Appointments/AppointmentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Assuming you store the user ID in local storage
                const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
                const response = await axios.get(`http://localhost:5000/appointments/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppointments(response.data);
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError(err.response?.data?.error || 'An error occurred');
            }
        };

        fetchAppointments();
    }, []);

    const handleEdit = (appointment) => {
        // Navigate to the AppointmentForm with the appointment's data
        navigate('/edit-appointment', { state: { appointment } });
    };

    const handleDelete = async (appointmentId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
                await axios.delete(`http://localhost:5000/appointments/${appointmentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Remove the deleted appointment from the state
                setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
                alert('Appointment deleted successfully');
            } catch (err) {
                console.error('Error deleting appointment:', err);
                setError(err.response?.data?.error || 'An error occurred while deleting the appointment');
            }
        }
    };

    return (
        <div>
            <h2>Appointment List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.id}>
                        {appointment.date} - {appointment.description}
                        <button onClick={() => handleEdit(appointment)}>Edit</button>
                        <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;