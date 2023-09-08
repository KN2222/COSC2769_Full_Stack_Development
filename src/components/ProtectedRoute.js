import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';

export const ProtectedRoute = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};
