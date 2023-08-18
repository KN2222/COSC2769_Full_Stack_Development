import { useState, useEffect } from "react";
import { APIService } from "../axios/client";

export const useCategoryTree = () => {
  const [categoryTree, setCategoryTree] = useState(null);

  useEffect(() => {
    const fetchCategoryTree = async () => {
      try {
        const response = await APIService.get("/store/category");
        console.log("response", response);
        const categories = response.data.hierarchicalCategoryTree;
        setCategoryTree(categories);
      } catch (error) {
        console.error("Error fetching category tree:", error);
      }
    };

    fetchCategoryTree();
  }, []);

 
  return categoryTree;
};
