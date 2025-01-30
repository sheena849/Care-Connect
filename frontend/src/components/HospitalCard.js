// src/components/HospitalCard.js
import React from 'react';

const HospitalCard = ({ hospital, onDelete }) => {
  return (
    <div className="hospital-card">
      <h3>{hospital.name}</h3>
      <p>{hospital.location}</p>
      <p>{hospital.services}</p>
      <button onClick={() => onDelete(hospital.id)}>Delete</button>
    </div>
  );
};

export default HospitalCard;
