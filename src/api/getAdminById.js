import { useEffect, useState } from "react";
import { APIService } from "../axios/client";

export const useGetAdminById = ({ id }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminById = async () => {
      try {
        const response = await APIService.get(`/admin/${id}`);
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin by id:", error);
      }
    };
    fetchAdminById();
  }, [id]);
  
  return admin;
};
