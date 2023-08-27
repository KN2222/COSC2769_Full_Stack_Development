import { useState, useEffect, useCallback } from "react";
import { APIService } from "../axios/client";

export const useCategoryTree = () => {
  const [categoryTree, setCategoryTree] = useState({});

  const fetchCategoryTree = useCallback(async () => {
    try {
      const response = await APIService.get("/customer/category");
      console.log("response", response.data.hierarchicalCategoryTree);
      setCategoryTree(response.data.hierarchicalCategoryTree);
    } catch (error) {
      console.error("Error fetching category tree:", error);
    }
  }, []);

  useEffect(() => {
    console.log("categoryTree", categoryTree);
  }, [categoryTree]);

  useEffect(() => {
    fetchCategoryTree();
  }, [fetchCategoryTree]);

  return {
    categoryTree,
  };
};
