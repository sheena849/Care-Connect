import React, { useState } from 'react';
import { createPatient } from '../services/patientService';
import PatientList from '../components/PatientList';

const Patients = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreatePatient = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage('Patient name is required');
      return;
    }
    try {
      await createPatient({ name });
      setName('');
      setMessage('Patient created successfully');
    } catch (error) {
      setMessage('Error creating patient');
    }
  };

  return (
    <div>
      <h1>Manage Patients</h1>
      <form onSubmit={handleCreatePatient}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter patient name"
        />
        <button type="submit">Create Patient</button>
      </form>
      {message && <p>{message}</p>}
      <PatientList />
    </div>
  );
};

export default Patients;
