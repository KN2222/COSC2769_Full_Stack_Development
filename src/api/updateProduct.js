import { APIService } from "../axios/client";
import { useState, useEffect } from "react";
import { useModalContext } from "../store/modalContext";

export const useUpdateProduct = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();

  const updateProduct = async (id, updateFields) => {
    try {
      const response = await APIService.patch(`/seller/product/${id}`, {
        updateFields,
      });
      console.log("in Update Product");
      setIsSuccess(true);
      closeModal();
      return response.data; // You can return the updated data if needed
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return {
    isSuccess,
    updateProduct,
  };
};
