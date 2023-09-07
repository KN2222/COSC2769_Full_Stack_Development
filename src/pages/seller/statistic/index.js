import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useGetSellerOrder } from "../../../api/getSellerOrder";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useToastContext } from "../../../store/toastContext";

export const SellerStatistic = () => {
  const {
    sellerOrder,
    fetchSellerOrder,
    shipProductOrder,
    cancelProductOrder,
  } = useGetSellerOrder();
  const { showToast } = useToastContext();
  const [productOrderStatusChanged, setProductOrderStatusChanged] =
    useState(false);

  const handleRefresh = () => {
    fetchSellerOrder()
      .then(() => {
        setProductOrderStatusChanged(true);
      })
      .catch((error) => {
        console.error("Error shipping order:", error);
      });
  };

  useEffect(() => {
    // Fetch the seller order whenever productOrderStatusChanged changes
    if (productOrderStatusChanged) {
      fetchSellerOrder()
        .then(() => {
          setProductOrderStatusChanged(false); // Reset the state to false after fetching
        })
        .catch((error) => {
          console.error("Error fetching seller order:", error);
        });
    }
  }, [productOrderStatusChanged, fetchSellerOrder]);

  return (
    <div>
      <Container>
        <h1>Order History</h1>
        <Button
          variant="primary"
          onClick={handleRefresh}
        >
          Refresh
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>

          {sellerOrder && (
            <tbody>
              {sellerOrder.productOrderOfSeller.map((productOrder) => (
                <tr key={productOrder._id}>
                  <td className="text-center">{productOrder.title}</td>
                  <td className="text-center">{productOrder.quantity}</td>
                  <td
                    className="text-center"
                    style={{
                      color:
                        productOrder.status === "Canceled"
                          ? "red"
                          : productOrder.status === "Shipped"
                          ? "blue"
                          : productOrder.status === "Accepted"
                          ? "green"
                          : productOrder.status === "Rejected"
                          ? "red"
                          : "black",
                    }}
                  >
                    {productOrder.status}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </Container>
    </div>
  );
};

export default SellerStatistic;
