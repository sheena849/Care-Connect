import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatientName, setNewPatientName] = useState('');
  const [userId, setUserId] = useState(1); // You can replace with dynamic user ID

  // Fetch patients for the user
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/patients/${userId}`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [userId]);

  // Handle patient creation
  const handleCreatePatient = async () => {
    try {
      const response = await axios.post('http://localhost:5000/patients', {
        name: newPatientName,
        user_id: userId
      });
      setPatients([...patients, response.data]);
      setNewPatientName('');
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  // Handle patient deletion
  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`);
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div>
      <h2>Manage Patients</h2>
      
      <input 
        type="text" 
        value={newPatientName} 
        onChange={(e) => setNewPatientName(e.target.value)} 
        placeholder="New patient name" 
      />
      <button onClick={handleCreatePatient}>Create Patient</button>
      
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.name}
            <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePatients;
