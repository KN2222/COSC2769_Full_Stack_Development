import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/authContext"
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { accessToken } = useAuth();

  useEffect(() => {
    console.log("accessToken", accessToken);
  }, [accessToken]);


  if (!accessToken) {
    return <Navigate to= "/"/>;
  } 
  return <Outlet/>;
} 