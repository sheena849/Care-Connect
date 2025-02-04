// src/components/Auth/Login.js
import React, { useState } from 'react';
import { login } from '../../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        console.log('Login response:', result); 
        if (result.token) {
                // Add error checking for userId
        if (!result.userId) {
            console.error('No userId in response:', result);
            return;
        }
            onLogin(result.token); 
            localStorage.setItem('userId', result.userId); //you were not storing data in the browser's local storage setItem does that for you
            localStorage.setItem('token', result.token);
            // Call onLogin with the token
            navigate('/home'); // Redirect to the home page after login
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;