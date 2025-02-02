// src/components/Appointments/AppointmentManagement.js
import React from 'react';
import AppointmentList from './AppointmentList'; // Import the list component
import AppointmentForm from './AppointmentForm'; // Import the form for creating/updating appointments

const AppointmentManagement = () => {
    return (
        <div>
            <h2>Appointment Management</h2>
            <AppointmentForm /> {/* Form to add/edit appointments */}
            <AppointmentList /> {/* List to display appointments */}
        </div>
    );
};

export default AppointmentManagement;