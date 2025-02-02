// src/components/Patients/PatientManagement.js
import React from 'react';
import PatientList from './PatientList';
import PatientForm from './PatientForm';

const PatientManagement = () => {
    return (
        <div>
            <h2>Patient Management</h2>
            <PatientForm /> {/* Form to add a new patient */}
            <PatientList /> {/* List of existing patients */}
        </div>
    );
};

export default PatientManagement;