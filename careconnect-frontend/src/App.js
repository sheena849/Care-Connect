// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import PatientManagement from './components/Patients/PatientManagement';
import PatientForm from './components/Patients/PatientForm'; // Import PatientForm
import AppointmentList from './components/Appointments/AppointmentList';
import HospitalManagement from './components/Hospitals/HospitalManagement';
import UserHospitalList from './components/UserHospitals/UserHospitalList';
import UserHospitalForm from './components/UserHospitals/UserHospitalForm';
import HospitalForm from './components/Hospitals/HospitalForm'; // Import HospitalForm
import Home from './components/Home'; // New Home component
import './App.css';

const App = () => {
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        // Check for existing token in local storage
        const token = localStorage.getItem('userToken');
        if (token) {
            setUserToken(token);
        }
    }, []);

    const handleLogin = (token) => {
        setUserToken(token);
        localStorage.setItem('userToken', token);
    };

    const handleLogout = () => {
        setUserToken(null);
        localStorage.removeItem('userToken');
    };

    return (
        <Router>
            <div>
                <Navbar userToken={userToken} onLogout={handleLogout} /> {/* Pass props to Navbar */}
                <h1>Healthcare Management System</h1>
                <Routes>
                    <Route path="/" element={userToken ? <Navigate to="/home" /> : <Navigate to="/signup" />} />
                    <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/home" element={<Home onLogout={handleLogout} />} />
                    <Route path="/patients" element={userToken ? <PatientManagement /> : <Navigate to="/login" />} />
                    <Route path="/edit-patient" element={userToken ? <PatientForm /> : <Navigate to="/login" />} /> {/* Add this route */}
                    <Route path="/appointments" element={userToken ? <AppointmentList /> : <Navigate to="/login" />} />
                    <Route path="/hospitals" element={userToken ? <HospitalManagement /> : <Navigate to="/login" />} />
                    <Route path="/user-hospitals" element={userToken ? <UserHospitalList /> : <Navigate to="/login" />} />
                    <Route path="/add-user-hospital" element={userToken ? <UserHospitalForm /> : <Navigate to="/login" />} />
                    <Route path="/edit-user-hospital" element={userToken ? <UserHospitalForm /> : <Navigate to="/login" />} />
                    <Route path="/edit-hospital" element={userToken ? <HospitalForm /> : <Navigate to="/login" />} /> {/* Add this route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;