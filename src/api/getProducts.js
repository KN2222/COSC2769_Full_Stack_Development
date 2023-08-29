import { useState, useEffect } from 'react';
import { APIService } from '../axios/client';

export const useGetProducts = (productId = null) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (productId) {
          console.log('productId', productId);
          response = await APIService.get(
            `https://fakestoreapi.com/products/${productId}`
          );
          setData([response.data]); // Wrap the single product data in an array
        } else {
          response = await APIService.get('https://fakestoreapi.com/products');
          setData(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  return { data, loading };
};
