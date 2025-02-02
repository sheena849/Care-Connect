// src/components/Home.js
import React from 'react';

const Home = ({ onLogout }) => {
    return (
        <div>
            <h2>Welcome to the Healthcare Management System</h2>
            <p>Your one-stop solution for managing patients, appointments, and hospitals.</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Home;