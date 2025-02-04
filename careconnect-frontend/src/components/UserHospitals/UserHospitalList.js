import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserHospitalList = () => {
    const [userHospitals, setUserHospitals] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserHospitals = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Assuming you store the user ID in local storage
                const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
                const response = await axios.get(`http://localhost:5000/userhospital/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserHospitals(response.data);
            } catch (err) {
                console.error('Error fetching user-hospital relationships:', err);
                setError(err.response?.data?.error || 'An error occurred while fetching the relationships.');
            }
        };

        fetchUserHospitals();
    }, []);

    const handleEdit = (userHospital) => {
        navigate('/user-hospitals/form', { state: { userHospital } });
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
        try {
            await axios.delete(`http://localhost:5000/userhospital/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserHospitals(userHospitals.filter(uh => uh.id !== id));
            console.log('User -Hospital relationship deleted:', id);
        } catch (err) {
            console.error('Error deleting user-hospital relationship:', err);
            setError(err.response?.data?.error || 'An error occurred while deleting the relationship.');
        }
    };

    return (
        <div>
            <h2>User-Hospital Relationships</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hospital ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userHospitals.map((uh) => (
                        <tr key={uh.id}>
                            <td>{uh.id}</td>
                            <td>{uh.hospital_id}</td>
                            <td>{uh.status}</td>
                            <td>
                                <button onClick={() => handleEdit(uh)}>Edit</button>
                                <button onClick={() => handleDelete(uh.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/user-hospitals/form')}>Add New Relationship</button>
        </div>
    );
};

export default UserHospitalList;
