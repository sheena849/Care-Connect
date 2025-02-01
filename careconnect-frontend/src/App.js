import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import ManagePatients from './components/Patient/ManagePatients';
import CreateAppointment from './components/Appointment/CreateAppointment';
import PatientDetails from './components/Patient/PatientDetails';  // Import PatientDetails component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<ManagePatients />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
        <Route path="/patients/:id" element={<PatientDetails />} />  {/* Add route for viewing/editing individual patient */}
      </Routes>
    </Router>
  );
};

export default App;
