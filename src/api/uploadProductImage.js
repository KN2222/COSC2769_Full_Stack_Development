import { APIService } from "../axios/client";
import { useState, useEffect } from "react";
import { useToastContext } from "../store/toastContext";

export const useUploadProductImage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToastContext();

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  const uploadProductImage = async ({productId, file}) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type to multipart/form-data for FormData
        },
      };
      const response = await APIService.post(`/seller/product/upload/${productId}`, formData, config);
      setIsSuccess(true);
      console.log("Image uploaded successfully", response.data);
      return response.data; // You can return the updated data if needed
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  };

  return {
    uploadProductImage,
    isSuccess,
  };
};
