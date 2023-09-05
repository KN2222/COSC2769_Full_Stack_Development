import { useCallback, useEffect, useState } from 'react';
import { APIService } from '../axios/client';
import { useToastContext } from '../store/toastContext';

export const useGetAllSeller = () => {
  const [sellers, setSellers] = useState([]);
  const [count, setCount] = useState(0);
  // const [refreshSignal, setRefreshSignal] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const { showToast } = useToastContext();

  const fetchAllSeller = useCallback(async () => {
    try {
      const response = await APIService.get('/admin/seller');
      setSellers(response.data.sellers);
      setCount(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching seller tree:', error);
    }
  }, []);

  const rejectSeller = async (sellerId) => {
    try {
      const response = await APIService.post(
        `/admin/reject-seller/${sellerId}`
      );
      showToast(response.status, response.data.message);
      fetchAllSeller();
    } catch (error) {
      showToast(error.data.status, error.data.message);
    }
  };

  const approveSeller = async (sellerId) => {
    try {
      const response = await APIService.post(
        `/admin/approve-seller/${sellerId}`
      );
      showToast(response.status, response.data.message);
      fetchAllSeller();
    } catch (error) {
      showToast(error.status, error.data.message);
    }
  };

  useEffect(() => {
    fetchAllSeller();
  }, [fetchAllSeller, showToast]);

  return {
    sellers,
    count,
    fetchAllSeller,
    rejectSeller,
    approveSeller,
    isLoading,
  };
};
