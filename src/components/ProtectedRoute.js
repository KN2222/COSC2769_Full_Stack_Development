import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/authContext';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};
