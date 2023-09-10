import { useCallback } from 'react';
import { APIService } from '../axios/client';

export function GetProductsByIds() {
  const fetchProductsByIds = useCallback(
    async (products) => {
      const productsData = {};

      for (const productToFetch of products) {
        const { product, quantity } = productToFetch;
        try {
          const response = await APIService.get(`/seller/product/${product}`);
          const fetchedProduct = response.data.product; // Access the 'product' object in the response

          productsData[product] = { product, quantity, ...fetchedProduct };
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
