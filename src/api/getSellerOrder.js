import react, { useEffect, useState } from "react";
import { APIService } from "../axios/client";
import { useToastContext } from "../store/toastContext";

export const useGetSellerOrder = () => {
  const [sellerOrder, setSellerOrder] = useState();
  const { showToast } = useToastContext();

  const fetchSellerOrder = async () => {
    try {
      const response = await APIService.get("/seller/order");
      setSellerOrder(response.data);
    } catch (error) {
      console.log(error.response);
      showToast(error.response.status, error.response.data.message);
    }
  };

  const shipProductOrder = async (id) => {
    try {
      const response = await APIService.patch(`/seller/product/ship/${id}`);
      showToast(response.status, response.data.message);
    } catch (error) {
      console.log(error.response);
      showToast(error.response.status, error.response.data.message);
    }
  };

  const cancelProductOrder = async (id) => {
    try {
      const response = await APIService.patch(`/seller/product/cancel/${id}`);
      showToast(response.status, response.data.message);
    } catch (error) {
      console.log(error.response);
      showToast(error.response.status, error.response.data.message);
    }
  };

  useEffect(() => {
    fetchSellerOrder();
  }, []); 

  return { sellerOrder, fetchSellerOrder, shipProductOrder, cancelProductOrder };
};