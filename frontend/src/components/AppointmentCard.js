// src/components/AppointmentCard.js

import React from 'react';

const AppointmentCard = ({ appointment, onDelete, onEdit }) => {
  return (
    <div className="appointment-card">
      <h3>{appointment.description}</h3>
      <p>{new Date(appointment.date).toLocaleString()}</p>
      <button onClick={() => onEdit(appointment.id)}>Edit</button>
      <button onClick={() => onDelete(appointment.id)}>Delete</button>
    </div>
  );
};

export default AppointmentCard;
