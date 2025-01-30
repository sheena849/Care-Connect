import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = () => {
  const user = authService.getCurrentUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
