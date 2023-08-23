import { useEffect, useState } from "react";
import { APIService } from "../axios/client";

export const useGetAllCategory = () => {
  const [categories, setCategories] = useState(null);
  const [count, setCount] = useState(0);

  const fetchAllCategory = async () => {
    try {
      const response = await APIService.get("/admin/category");
      console.log("response", response);
      setCategories(response.data.categories);
      setCount(response.data.count);
    } catch (error) {
      console.error("Error fetching category tree:", error);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  return { categories, count, fetchAllCategory };
}