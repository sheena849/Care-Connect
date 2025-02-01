import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDetails = ({ match }) => {
  const [patient, setPatient] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  const patientId = match.params.id;

  // Fetch patient details
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/patients/${patientId}`);
        setPatient(response.data);
        setUpdatedName(response.data.name);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    fetchPatient();
  }, [patientId]);

  // Handle patient update
  const handleUpdatePatient = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/patients/${patientId}`, { name: updatedName });
      setPatient(response.data);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div>
      <h2>Patient Details</h2>
      <input 
        type="text" 
        value={updatedName} 
        onChange={(e) => setUpdatedName(e.target.value)} 
        placeholder="Updated patient name" 
      />
      <button onClick={handleUpdatePatient}>Update Patient</button>
      <p>{patient.name}</p>
    </div>
  );
};

export default PatientDetails;
