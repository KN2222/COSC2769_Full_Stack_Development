import { useCallback, useEffect, useState } from "react";
import { APIService } from "../axios/client";

export const useGetAllCategory = () => {
  const [categories, setCategories] = useState(null);
  const [count, setCount] = useState(0);
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const fetchAllCategory = useCallback(async () => {
    try {
      const response = await APIService.get("/admin/category");
      console.log("response", response);
      setCategories(response.data.categories);
      setCount(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category tree:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllCategory();
  }, [fetchAllCategory, refreshSignal]);

  useEffect(() => {
    if (refreshSignal > 0) {
      fetchAllCategory();
    }
  }, [refreshSignal, fetchAllCategory]);

  const refreshCategories = useCallback(() => {
    console.log("refreshCategories");
    setRefreshSignal((prevSignal) => prevSignal + 1);
  }, []);

  return { categories, count, fetchAllCategory, refreshCategories, isLoading };
};
