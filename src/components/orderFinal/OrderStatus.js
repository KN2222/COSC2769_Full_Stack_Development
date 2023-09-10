import React from 'react';
import Order from './Order';
import { Container } from 'react-bootstrap';

const OrderStatus = () => {
  // {{store}}/customer/order
  // Empty dependency array to run only on mount

  return (
    <Container>
      <h1 className='mt-4 text-center text-primary'>Order Status</h1>
      <div className='mt-4'>
        <Order
        // order={orders}
        // fn={getOrder}
        />
      </div>
    </Container>
  );
};

export default OrderStatus;
