import { APIService } from '../axios/client';

function PutCart() {
  const updateCustomerCart = async (cartData) => {
    console.log('Updating cart');
    try {
      const response = await APIService.put('/customer/cart', {
        cart: cartData,
      });

      // Check if the response indicates success (you can define your own success criteria)
      if (response.status === 200) {
        // Handle successful update, if needed
      } else {
        // Handle other response statuses as needed
        console.log('Failed to update cart');
      }
    } catch (error) {
      // Handle any network errors or exceptions
      console.log('An error occurred while updating the cart');
    }
  };

  return { updateCustomerCart };
}

export default PutCart;
