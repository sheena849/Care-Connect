import React from 'react';
import { Link } from 'react-router-dom';

const PatientCard = ({ patient, onDelete }) => {
  return (
    <div className="patient-card">
      <h3>{patient.name}</h3>
      <button onClick={() => onDelete(patient.id)}>Delete</button>
      <Link to={`/patients/${patient.id}`}>Edit</Link>
    </div>
  );
};

export default PatientCard;
