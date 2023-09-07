import React from "react";
import Order from "./Order";
import sampleProducts from "../../api/sampleProducts";
import { Container } from "react-bootstrap";

const OrderStatus = () => {
  const orders = [
    {
      id: 1,
      products: [
        sampleProducts[0],
        sampleProducts[1],
        sampleProducts[2],
        sampleProducts[3],
      ],
    },
  ];

  return (
    <Container>
      <h1 className="mt-4 text-center text-primary">Order Status</h1>
      <div className="mt-4">
        {orders.map((order) => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </Container>
  );
};

export default OrderStatus;
