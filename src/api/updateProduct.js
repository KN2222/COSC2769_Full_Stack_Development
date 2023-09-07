import { APIService } from "../axios/client";
import { useState, useEffect } from "react";
import { useModalContext } from "../store/modalContext";
import { useUploadProductImage } from "./uploadProductImage";
import { useToastContext } from "../store/toastContext";
import { useGetSellerProduct } from "./getSellerProduct";

export const useUpdateProduct = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();
  const {uploadProductImage} = useUploadProductImage();
  // const{fetchSellerProduct} = useGetSellerProduct();
  const { showToast } = useToastContext();

  const updateProduct = async (id, updateFields, file) => {
    try {
      const response = await APIService.patch(`/seller/product/${id}`, {
        updateFields,
      });
      if(file){
        console.log("file exists");
        await uploadProductImage({productId: id, file});
      }
      setIsSuccess(true);
      closeModal();
      showToast(200, "Product updated successfully");
      return response.data; // You can return the updated data if needed
    } catch (error) {
      showToast(error.response.status, error.response.data.message);    }
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
