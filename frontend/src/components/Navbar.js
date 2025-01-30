// src/components/Navbar.js

import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const user = authService.getCurrentUser();
  
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/appointments">Appointments</Link></li> {/* Link to appointments */}
            <li><Link to="/patients">Patients</Link></li> {/* Link to patients */}
            <li><Link to="/hospitals">Hospitals</Link></li> {/* Add this line */}
            <li><button onClick={authService.logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
