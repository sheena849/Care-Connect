// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateAppointment = () => {
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token');
//     const userId = 1; // Temporarily using a placeholder value for userId

//     try {
//       const response = await axios.post(
//         '/appointments/',
//         {
//           date,
//           description,
//           user_id: userId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // Handle successful appointment creation
//       alert('Appointment created successfully!');
//     } catch (error) {
//       setErrorMessage(error.response?.data?.error || 'Failed to create appointment');
//     }
//   };

//   return (
//     <div>
//       <h2>Create Appointment</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <button type="submit">Create Appointment</button>
//       </form>
//       {errorMessage && <div>{errorMessage}</div>}
//     </div>
//   );
// };

// export default CreateAppointment;
