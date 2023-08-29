import { useEffect, useState } from "react";
import { APIService } from "../axios/client";
import { useToastContext } from "../store/toastContext";

export const useGetAdminById = ({ id }) => {
  const [admin, setAdmin] = useState(null);
  const { showToast } = useToastContext();
  useEffect(() => {
    const fetchAdminById = async () => {
      try {
        const response = await APIService.get(`/admin/${id}`);
        setAdmin(response.data);
      } catch (error) {
        showToast(error.response.status, error.response.data.message);
      }
    };
    fetchAdminById();
  }, [id, showToast]);

  return admin;
};
