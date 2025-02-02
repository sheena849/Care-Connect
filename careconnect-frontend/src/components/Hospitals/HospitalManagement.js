// src/components/Hospitals/HospitalManagement.js
import React from 'react';
import HospitalList from './HospitalList';
import HospitalForm from './HospitalForm';

const HospitalManagement = () => {
    return (
        <div>
            <h2>Hospital Management</h2>
            <HospitalForm /> {/* Form to add a new hospital */}
            <HospitalList /> {/* List of existing hospitals */}
        </div>
    );
};

export default HospitalManagement;