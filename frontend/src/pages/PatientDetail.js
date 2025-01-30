import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePatient } from '../services/patientService';

const PatientDetail = () => {
  const { patientId } = useParams();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patient details and populate form fields
    // Assuming we have a method to fetch a single patient by ID
    // In a real-world scenario, we should use `getPatient` API service for this
    setName('Existing Patient Name'); // This should come from API
  }, [patientId]);

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage('Patient name is required');
      return;
    }
    try {
      await updatePatient(patientId, { name });
      setMessage('Patient updated successfully');
      navigate('/patients');
    } catch (error) {
      setMessage('Error updating patient');
    }
  };

  return (
    <div>
      <h1>Edit Patient</h1>
      <form onSubmit={handleUpdatePatient}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter patient name"
        />
        <button type="submit">Update Patient</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PatientDetail;
