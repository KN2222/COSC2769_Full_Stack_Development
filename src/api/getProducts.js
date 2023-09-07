import { useState, useEffect } from "react";
import { APIService } from "../axios/client";
import { useToastContext } from "../store/toastContext";

export const useGetProducts = (productId = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToastContext();
///seller/product/image/productID
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (productId) {
          response = await APIService.get(`/seller/product/${productId}`);
          setData([response.data.product]); // Wrap the single product data in an array
        } else {
          response = await APIService.get("/customer/product");
          setData(response.data.products);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast(error.response.status, error.response.data.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [productId, showToast]);

  return { data, loading };
};
