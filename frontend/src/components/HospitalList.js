// src/components/HospitalList.js
import React, { useState, useEffect } from 'react';
import { getHospitals, deleteHospital } from '../services/hospitalService';
import HospitalCard from './HospitalCard';

const HospitalList = ({ token }) => {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitals();
        setHospitals(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHospitals();
  }, []);

  const handleDelete = async (hospitalId) => {
    try {
      await deleteHospital(hospitalId, token);
      setHospitals(hospitals.filter((hospital) => hospital.id !== hospitalId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Hospitals</h2>
      {error && <p>Error: {error}</p>}
      <div>
        {hospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default HospitalList;
