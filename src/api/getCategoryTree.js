import { useState, useEffect } from "react";
import { APIService } from "../axios/client";

// custom hook --> all for API 

export const useCategoryTree = () => {
  const [categoryTree, setCategoryTree] = useState(null);

  const fetchCategoryTree = async () => {
    try {
      const response = await APIService.get("/customer/category");
      console.log("response", response);
      const categories = response.data.hierarchicalCategoryTree;
      setCategoryTree(categories);
    } catch (error) {
      console.error("Error fetching category tree:", error);
    }
  };

  useEffect(() => {
    fetchCategoryTree();
  }, []);

 
  return categoryTree;
};
