import { useCallback, useEffect } from "react";
import { APIService } from "../axios/client";
import { useToastContext } from "../store/toastContext";

export const useGetCategoryById = () => {
  const { showToast } = useToastContext();
  const fetchCategoryById = useCallback(async (id) => {
    try {
      if (id) {
        const response = await APIService.get(`/customer/category/${id}`);
        return response.data.category;
      }
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  }, [showToast]);

  useEffect(() => {
    fetchCategoryById();
  }, [fetchCategoryById]);

  return {
    fetchCategoryById,
  };
};
