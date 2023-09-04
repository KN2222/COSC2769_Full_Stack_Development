import { useCallback, useEffect, useState } from 'react';
import { APIService } from '../axios/client';
import { useToastContext } from '../store/toastContext';
import { useModalContext } from '../store/modalContext';

export const useGetAllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const { showToast } = useToastContext();
  const { showModal } = useModalContext();

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await APIService.get('/admin/category');
        setCategories([...response.data.categories]);
        setCount(response.data.count);
        setLoading(false);
        setRefresh(false);
      } catch (error) {
        console.error('Error fetching category tree:', error);
        showToast(error.response.status, error.response.data.message);
      }
    };
    if (!showModal) {
      fetchAllCategory();
    }
  }, [showModal, showToast, refresh]);

  return {
    categories,
    count,
    isLoading,
    setCategories,
    setRefresh,
  };
};
