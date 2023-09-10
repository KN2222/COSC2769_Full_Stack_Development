import { useEffect, useState } from 'react';
import { APIService } from '../axios/client';

const GetCart = () => {
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartData = async () => {
    try {
      const response = await APIService.get('/customer/cart');
      if (response.data) {
        // Assuming your API response has a data field containing cart data
        setCartData(response.data);
        setIsLoading(false); // Set loading to false when data is received
      }
    } catch (error) {
      console.log(error);
      // Retry after a delay if there's an error (adjust the delay as needed)
      // setTimeout(fetchCartData, 5000); // Retry after 5 seconds (you can change the delay)
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []); // Empty dependency array to run this effect once when the component mounts

  return { cartData, isLoading };
};

export default GetCart;
