import { APIService } from '../axios/client';
import { useState, useEffect } from 'react';
import { useModalContext } from '../store/modalContext';

export const useUpdateCategory = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { closeModal } = useModalContext();

  const updateCategory = async (id, updateFields) => {
    try {
      const response = await APIService.patch(`/admin/category/${id}`, {
        updateFields,
      });
      setIsSuccess(true);
      closeModal();
      return response.data; // You can return the updated data if needed
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess(false);
    } 
  }, [isSuccess]);

  return {
    isSuccess,
    updateCategory,
  };
};
