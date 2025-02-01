// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ManageHospitals = () => {
//   const [hospitals, setHospitals] = useState([]);
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState('');
//   const [services, setServices] = useState('');

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('/hospitals/', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setHospitals(response.data);
//       } catch (error) {
//         console.error('Failed to fetch hospitals', error);
//       }
//     };

//     fetchHospitals();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         '/hospitals/',
//         { name, location, services },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert('Hospital added successfully');
//       setName('');
//       setLocation('');
//       setServices('');
//     } catch (error) {
//       console.error('Error adding hospital', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Hospitals</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Hospital Name"
//           required
//         />
//         <input
//           type="text"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           placeholder="Location"
//           required
//         />
//         <textarea
//           value={services}
//           onChange={(e) => setServices(e.target.value)}
//           placeholder="Services Offered"
//           required
//         />
//         <button type="submit">Add Hospital</button>
//       </form>
//       <div>
//         {hospitals.map((hospital) => (
//           <div key={hospital.id}>
//             <h3>{hospital.name}</h3>
//             <p>{hospital.location}</p>
//             <p>{hospital.services}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageHospitals;
