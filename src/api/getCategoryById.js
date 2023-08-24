import { useCallback, useEffect } from "react";
import { APIService } from "../axios/client";

export const useGetCategoryById = () => {
  const fetchCategoryById = useCallback(async (id) => {
    try {
      if (id) {
        const response = await APIService.get(`/customer/category/${id}`);
        return response.data.category;
      }
    } catch (error) {
      console.error("Error fetching category by id:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategoryById();
  }, [fetchCategoryById]);

  return {
    fetchCategoryById,
  };
};
