import { useState, useEffect } from "react";
import { APIService } from "../axios/client";
import { useModalContext } from "../store/modalContext";
import { useUploadProductImage } from "./uploadProductImage";
import { useToastContext } from "../store/toastContext";


export const useCreateProduct = () => {
  const [newProduct, setNewProduct] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();
  const {uploadProductImage} = useUploadProductImage();
  const { showToast } = useToastContext();


  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  const createProduct = async (title, description, price, stock, categoryId, file ) => {
    try {
      const response = await APIService.post("/seller/product", {
        title,
        description,
        price,
        stock,
        categoryId
      });
      setNewProduct(response.data);
      uploadProductImage({productId: response.data.product._id, file});
      setIsSuccess(true);
      closeModal();
      return response.data;
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  };

  return {
    newProduct,
    isSuccess,
    createProduct,
  };
};
