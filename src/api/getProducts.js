import { useState, useEffect } from "react";
import { APIService } from "../axios/client";

export const useGetProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await APIService.get("https://fakestoreapi.com/products");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { data, loading };
};
