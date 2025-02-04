// src/components/Home.js
import React from 'react';

const Home = ({ onLogout }) => {
    return (
        <div className="home-container">
            <h2>Welcome to the Healthcare Management System</h2>
            <p>Your one-stop solution for managing patients, appointments, and hospitals. 
                With our platform, managing your healthcare workflow has never been easier. 
                Stay organized, improve efficiency, and provide better care for your patients.
            </p>
            <p>
                From booking appointments to managing hospital affiliations, we aim to make your 
                healthcare experience seamless and straightforward.
            </p>
            <p>
                Ready to get started? Dive in and explore the full range of features we offer!
            </p>
            <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default Home;
