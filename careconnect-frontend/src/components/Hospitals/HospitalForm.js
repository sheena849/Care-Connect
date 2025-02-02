import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const HospitalForm = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [services, setServices] = useState('');
    const [error, setError] = useState('');
    const locationState = useLocation();
    const navigate = useNavigate();
    const hospital = locationState.state?.hospital; // Get the hospital data from the state

    useEffect(() => {
        console.log('Received hospital data:', hospital); // Log the hospital data
        if (hospital) {
            setName(hospital.name);
            setLocation(hospital.location);
            setServices(hospital.services);
        }
    }, [hospital]);

    const handleSubmit = async (e) => { // Add async here
      e.preventDefault();
      setError(''); // Reset error message
  
      try {
          const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
          if (hospital) {
              // If hospital exists, update the hospital
              await axios.put(`http://localhost:5000/hospitals/${hospital.id}`, 
                  { name, location, services }, 
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              console.log('Hospital updated:', hospital.id);
          } else {
              // If no hospital exists, create a new one
              await axios.post('http://localhost:5000/hospitals/', 
                  { name, location, services }, 
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              console.log('Hospital created');
          }
          navigate('/hospitals'); // Redirect to the hospital list after submission
      } catch (err) {
          console.error('Error saving hospital:', err);
          setError(err.response?.data?.error || 'An error occurred while saving the hospital.');
      }
  };

    return (
        <div>
            <h2>{hospital ? 'Edit Hospital' : 'Add Hospital'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hospital Name"
                    required
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    required
                />
                <textarea
                    value={services}
                    onChange={(e) => setServices(e.target.value)}
                    placeholder="Services Offered"
                />
                <button type="submit">{hospital ? 'Update Hospital' : 'Add Hospital'}</button>
            </form>
        </div>
    );
};

export default HospitalForm;