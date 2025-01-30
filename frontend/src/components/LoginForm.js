// src/components/CreateAppointmentForm.js

import React, { useState } from 'react';
import { createAppointment } from '../services/appointmentService';
import { useHistory } from 'react-router-dom';

const CreateAppointmentForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await createAppointment(formData);
      history.push(`/appointments/${response.appointment.id}`);
    } catch (error) {
      setError('Failed to create appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Appointment</h2>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="date">Date and Time</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Appointment</button>
    </form>
  );
};

export default CreateAppointmentForm;
