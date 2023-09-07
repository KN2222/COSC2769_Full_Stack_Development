import { useState, useEffect } from "react";
import { APIService } from "../axios/client";
import { useToastContext } from "../store/toastContext";
import { useModalContext } from "../store/modalContext";

export const useGetSellerProduct = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const { showToast } = useToastContext();
  const { showModal } = useModalContext();

  useEffect(() => {
    const fetchSellerProduct = async () => {
      try {
        const response = await APIService.get("/seller/product");
        setProducts([...response.data.productsOfSeller]);
        setCount(response.data.count);
        setLoading(false);
        setRefresh(false);
      } catch (error) {
        console.error("Error fetching seller product:", error);
        showToast(error.response.status, error.response.data.message);
      }
    };
    if (!showModal) {
      fetchSellerProduct();
    }
  }, [showModal, showToast, refresh]);

  return { products, isLoading, setProducts, setRefresh, count };
};
