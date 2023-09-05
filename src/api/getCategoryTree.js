import { useState, useEffect, useCallback } from 'react';
import { APIService } from '../axios/client';
import { useToastContext } from '../store/toastContext';

export const useCategoryTree = () => {
  const [categoryTree, setCategoryTree] = useState({});
  const { showToast } = useToastContext();

  const fetchCategoryTree = useCallback(async () => {
    try {
      const response = await APIService.get('/customer/category');
      setCategoryTree(response.data.hierarchicalCategoryTree);
    } catch (error) {
      showToast(error.response.status, error.response.data.message);
    }
  }, [showToast]);

  useEffect(() => {}, [categoryTree]);

  useEffect(() => {
    fetchCategoryTree();
  }, [fetchCategoryTree]);

  return {
    categoryTree,
  };
};
