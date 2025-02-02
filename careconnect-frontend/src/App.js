// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import PatientManagement from './components/Patients/PatientManagement';
import AppointmentList from './components/Appointments/AppointmentList';
import HospitalManagement from './components/Hospitals/HospitalManagement';
import UserHospitalList from './components/UserHospitals/UserHospitalList';
import UserHospitalForm from './components/UserHospitals/UserHospitalForm';
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
                <Navbar />
                <h1>Healthcare Management System</h1>
                <Routes>
                    <Route path="/" element={userToken ? <Navigate to="/home" /> : <Navigate to="/signup" />} />
                    <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/home" element={<Home onLogout={handleLogout} />} />
                    <Route path="/patients" element={<PatientManagement />} />
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route path="/hospitals" element={<HospitalManagement />} />
                    <Route path="/user-hospitals" element={<UserHospitalList />} />
                    <Route path="/add-user-hospital" element={<UserHospitalForm />} />
                    <Route path="/edit-user-hospital" element={<UserHospitalForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;