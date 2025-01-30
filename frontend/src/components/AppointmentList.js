// src/components/AppointmentList.js

import React, { useState, useEffect } from 'react';
import { getAppointmentsByUser } from '../services/appointmentService'; // Assuming correct path

const AppointmentList = ({ userId, token }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointmentsByUser(userId, token);
        setAppointments(data);
      } catch (err) {
        setError(err.message); // Set error message if an error occurs
      }
    };

    fetchAppointments();
  }, [userId, token]);

  return (
    <div>
      <h2>Appointments</h2>
      {error && <div className="error">{error}</div>} {/* Display the error message */}
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.date} - {appointment.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
