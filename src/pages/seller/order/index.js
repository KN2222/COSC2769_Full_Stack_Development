import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useGetSellerOrder } from "../../../api/getSellerOrder";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useToastContext } from "../../../store/toastContext";

export const SellerOrder = () => {
  const {
    sellerOrder,
    fetchSellerOrder,
    shipProductOrder,
    cancelProductOrder,
  } = useGetSellerOrder();
  const { showToast } = useToastContext();
  const [productOrderStatusChanged, setProductOrderStatusChanged] =
    useState(false);

  const handleShipProductOrder = (id) => {
    shipProductOrder(id)
      .then(() => {
        setProductOrderStatusChanged(true);
      })
      .catch((error) => {
        console.error("Error shipping order:", error);
      });
  };

  const handleCancelProductOrder = (id) => {
    cancelProductOrder(id)
      .then(() => {
        setProductOrderStatusChanged(true);
      })
      .catch((error) => {
        console.error("Error canceling order:", error);
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
        <h1>As a seller you can choose to Ship or Cancel the order</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-center">Title</th>
              <th className="text-center">Quantity</th>
              {/* <th className="text-center">Price</th> */}
              {/* <th className="text-center">Status</th> */}
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {sellerOrder && (
            <tbody>
              {sellerOrder.productOrderOfSeller
                .filter((productOrder) => productOrder.status === "New")
                .map((productOrder) => (
                  <tr key={productOrder._id}>
                    <td className="text-center">{productOrder.title}</td>
                    <td className="text-center">{productOrder.quantity}</td>

                    {/* <td
                      className="text-center"
                      style={{
                        color:
                          productOrder.status === "Canceled"
                            ? "red"
                            : productOrder.status === "Shipped"
                            ? "green"
                            : "black",
                      }}
                    >
                      {productOrder.status}
                    </td> */}
                    <td className="d-flex justify-content-center gap-3">
                      <Button
                        variant="primary"
                        onClick={() => handleShipProductOrder(productOrder._id)}
                      >
                        Ship
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleCancelProductOrder(productOrder._id)
                        }
                      >
                        Cancel
                      </Button>
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

export default SellerOrder;
