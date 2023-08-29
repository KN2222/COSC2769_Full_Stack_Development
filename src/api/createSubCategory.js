import { APIService } from "../axios/client";
import { useState, useEffect } from "react";
import { useToastContext } from "../store/toastContext";

export const useCreateSubCategory = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToastContext();

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  const createSubCategory = async ({ parentId, name, updateFields }) => {
    try {
      const response = await APIService.post(`/admin/category/${parentId}`, {
        name,
        updateFields,
      });
      setIsSuccess(true);
      return response.data; // You can return the updated data if needed
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  };

  return {
    createSubCategory,
    isSuccess,
  };
};
