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


  const getProductImage = async (productId) => {
      try {
        const response = await APIService.get(`/seller/product/image/${productId}`, {
          responseType: 'blob',
        });
        if (response.status === 200) {
          const blob = response.data;
          setProductImage(URL.createObjectURL(blob));
          return URL.createObjectURL(blob);
        } else {
          console.error('Failed to get product image:', response.statusText);
          return "http://localhost:8000/product/no-image.png";

        }
      } catch (error) {
        console.error('Error getting product image:', error);
        return "http://localhost:8000/product/no-image.png";

      }
    }

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