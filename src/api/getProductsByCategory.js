import { useEffect, useState } from 'react';
import { APIService } from '../axios/client';

export const GetProductsByCategory = (categoryId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await APIService.get(
          `/customer/product/${categoryId}`
        );
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.log('Failed to fetch products');
        }
      } catch (error) {
        console.log('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  return { products, loading };
};
