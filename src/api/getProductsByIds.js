import { useCallback } from 'react';
import { APIService } from '../axios/client';

export function GetProductsByIds() {
  const fetchProductsByIds = useCallback(
    async (products) => {
      const productsData = {};

      for (const product of products) {
        const { id, quantity } = product;
        try {
          const response = await APIService.get(`/seller/product/${id}`);
          const fetchedProduct = response.data.product; // Access the 'product' object in the response

          productsData[id] = { id, quantity, ...fetchedProduct };
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      }
      return productsData;
    },
    [] // You may include additional dependencies if needed
  );

  return { fetchProductsByIds };
}
