// src/pages/HospitalPage.js
import React, { useState } from 'react';
import CreateHospitalForm from '../components/CreateHospitalForm';
import HospitalList from '../components/HospitalList';

const HospitalPage = ({ token }) => {
  const [hospitalCreated, setHospitalCreated] = useState(false);

  const handleCreateHospital = async (hospitalData) => {
    try {
      await createHospital(hospitalData, token);
      setHospitalCreated(true);
    } catch (err) {
      console.error("Error creating hospital:", err);
    }
  };

  return (
    <div>
      <h1>Manage Hospitals</h1>
      <CreateHospitalForm onCreate={handleCreateHospital} />
      {hospitalCreated && <p>Hospital created successfully!</p>}
      <HospitalList token={token} />
    </div>
  );
};

export default HospitalPage;
