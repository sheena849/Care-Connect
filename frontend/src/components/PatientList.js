import React, { useEffect, useState } from 'react';
import { getAllPatients, deletePatient } from '../services/patientService';
import PatientCard from './PatientCard';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  const handleDelete = async (patientId) => {
    try {
      await deletePatient(patientId);
      setPatients(patients.filter(patient => patient.id !== patientId));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div className="patient-list">
      <h2>All Patients</h2>
      {patients.length > 0 ? (
        patients.map(patient => (
          <PatientCard key={patient.id} patient={patient} onDelete={handleDelete} />
        ))
      ) : (
        <p>No patients found</p>
      )}
    </div>
  );
};

export default PatientList;
