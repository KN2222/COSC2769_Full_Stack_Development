import { APIService } from "../axios/client";
import { useState, useEffect, useCallback } from "react";
import { useModalContext } from "../store/modalContext";
import { useUploadProductImage } from "./uploadProductImage";
import { useToastContext } from "../store/toastContext";
import { useGetSellerProduct } from "./getSellerProduct";

export const useGetImageFromID = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();
  const {uploadProductImage} = useUploadProductImage();
  const{fetchSellerProduct} = useGetSellerProduct();
  const { showToast } = useToastContext();
  const [productImage, setProductImage] = useState(null); // State to store the product image


  const getProductImage = useCallback(async (productId) => {
      try {
        const response = await APIService.get(`/user/avatar/${productId}`, {
          responseType: 'blob',
        });

        if (response.status === 200) {
          const blob = response.data;
          setProductImage(URL.createObjectURL(blob));
          return URL.createObjectURL(blob);
        } else {
          console.error('Failed to get user avatar:', response.statusText);
        }
      } catch (error) {
        console.error('Error getting user avatar:', error);
      }
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return {
    isSuccess,
    productImage,
    getProductImage,
    getProductImage
  };
};