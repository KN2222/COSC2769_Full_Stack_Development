import { useCallback } from 'react';
import { APIService } from '../axios/client';

export function CreateOrder() {
  const handleCheckout = useCallback(
    async (cartData, isAuthenticated, navigate) => {
      if (!isAuthenticated) {
        alert('Please Login first to place an order');
        navigate('/login');
      } else {
        try {
          // Prepare the productOrders array
          const productOrders = Object.values(cartData).map((product) => ({
            product: product.id,
            quantity: product.quantity || 0,
            price: product.price,
          }));

          // Create the request body with the correct property name
          const requestBody = {
            productOrders: productOrders, // Use "productOrders" here
          };

          // Convert the requestBody to a JSON string
          const requestBodyJSON = JSON.stringify(requestBody);

          // Send a POST request to the checkout endpoint using APIService
          const response = await APIService.post(
            '/customer/checkout',
            requestBodyJSON,
            {
              headers: {
                'Content-Type': 'application/json', // Set the Content-Type header
              },
            }
          );

          // Handle success
          console.log('Checkout response:', response.data);
          if (response.data.message === 'Create order successfully') {
            // Clear the 'cart' item from local storage
            localStorage.removeItem('cart');

            // Reload the page
            window.location.reload();
          }

          // You can add further handling or navigation logic here
        } catch (error) {
          // Handle error
          console.error('Error during checkout:', error);
          // You can display an error message or perform other error handling here
        }
      }
    },
    [] // You may include additional dependencies if needed
  );

  return { handleCheckout };
}
