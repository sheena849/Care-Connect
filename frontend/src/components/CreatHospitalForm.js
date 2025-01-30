// src/components/CreateHospitalForm.js
import React, { useState } from 'react';

const CreateHospitalForm = ({ onCreate }) => {
  const [hospitalData, setHospitalData] = useState({
    name: '',
    location: '',
    services: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({ ...hospitalData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(hospitalData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Hospital Name"
        value={hospitalData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={hospitalData.location}
        onChange={handleChange}
      />
      <textarea
        name="services"
        placeholder="Services Offered"
        value={hospitalData.services}
        onChange={handleChange}
      />
      <button type="submit">Create Hospital</button>
    </form>
  );
};

export default CreateHospitalForm;
