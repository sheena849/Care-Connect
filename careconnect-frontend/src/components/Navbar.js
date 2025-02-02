// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/patients">Patients</Link>
                </li>
                <li>
                    <Link to="/appointments">Appointments</Link>
                </li>
                <li>
                    <Link to="/hospitals">Hospitals</Link>
                </li>
                <li>
                    <Link to="/user-hospitals">User  Hospitals</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;