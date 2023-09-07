import { useCallback, useEffect } from 'react';
import { APIService } from '../axios/client';
import { useToastContext } from '../store/toastContext';
import { useState } from 'react';

export const useGetImageById = (productId) => {
  const [productImage, setProductImage] = useState(null); // State to store the product image
  const { showToast } = useToastContext();

  const fetchImageById = useCallback(
    async (id) => {
      try {
        if (id) {
          const response = await APIService.get(
            `/seller/product/image/${productId}`,
            {
              responseType: 'blob',
            }
          );
          if (response.status === 200) {
            const blob = response.data;
            setProductImage(URL.createObjectURL(blob));
          } else {
            console.error('Failed to get product image:', response.statusText);
          }
        }
      } catch (error) {
        showToast(error.response.status, error.response.data.message);
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchImageById(productId); // Fetch the product image for the given productId
  }, [fetchImageById]);

  return {
    productImage,
  };
};
