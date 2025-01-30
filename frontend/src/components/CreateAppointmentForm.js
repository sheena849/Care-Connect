// src/components/CreateAppointmentForm.js

import React, { useState } from 'react';
import { createAppointment } from '../services/appointmentService';

const CreateAppointmentForm = ({ userId, token, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const appointmentData = { description, date, user_id: userId };
    try {
      await createAppointment(appointmentData, token);
      onSuccess();  // Call the callback to refresh the appointment list
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>Date</label>
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Create Appointment</button>
    </form>
  );
};

export default CreateAppointmentForm;
