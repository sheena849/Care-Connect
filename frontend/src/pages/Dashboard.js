// src/pages/Dashboard.js

import React from 'react';
import Navbar from '../components/Navbar';
import AppointmentList from '../components/AppointmentList';
import PatientList from '../components/PatientList';  // Import the PatientList component

const Dashboard = () => {
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  return (
    <div>
      
      <h2>Your Appointments</h2>
      <AppointmentList />
      <h2>Your Patients</h2>
      <PatientList token={token} /> {/* Render the PatientList component */}
    </div>
  );
};

export default Dashboard;
