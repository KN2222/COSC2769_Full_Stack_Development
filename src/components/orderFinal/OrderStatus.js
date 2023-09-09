import React from 'react';
import Order from './Order';
import { Container } from 'react-bootstrap';
import { APIService } from '../../axios/client';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const OrderStatus = () => {
  // {{store}}/customer/order

  const [orders, setOrders] = useState([]);

  const getOrder = useCallback(async () => {
    try {
      const response = await APIService.get('/customer/order');
      if (response.data && response.data.productOrderOfCustomer) {
        setOrders(response.data.productOrderOfCustomer);
      } else {
        // Handle the case where the response doesn't contain the expected data
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      // Handle errors here, e.g., show an error message to the user
      console.error('Error fetching order:', error);
    }
  }, []);

  useEffect(() => {
    getOrder(); // Call it once when the component mounts
  }, []); // Empty dependency array to run only on mount

  console.log(orders); // This will show the initial value of 'order' in the first render

  return (
    <Container>
      <h1 className='mt-4 text-center text-primary'>Order Status</h1>
      <div className='mt-4'>
        <Order order={orders} />
      </div>
    </Container>
  );
};

export default OrderStatus;
