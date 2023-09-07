import { useCallback } from 'react';
import { APIService } from '../axios/client';

export function PatchOrderActions() {
  // Define a function to reject an order
  const rejectOrder = useCallback(async (orderId) => {
    try {
      const response = await APIService.patch(
        `/customer/order/reject/${orderId}`
      );
      // Handle the response here
      console.log('Order rejection response:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error rejecting order:', error);
    }
  }, []);

  // Define a function to accept an order
  const acceptOrder = useCallback(async (orderId) => {
    try {
      const response = await APIService.patch(
        `/customer/order/accept/${orderId}`
      );
      // Handle the response here
      console.log('Order acceptance response:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('Error accepting order:', error);
    }
  }, []);

  return { rejectOrder, acceptOrder };
}
