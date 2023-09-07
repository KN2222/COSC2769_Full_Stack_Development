import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Order({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [productStatus, setProductStatus] = useState({}); // Track product status

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAccept = (productId) => {
    setProductStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: "Accepted",
    }));
  };

  const handleReject = (productId) => {
    setProductStatus((prevStatus) => ({
      ...prevStatus,
      [productId]: "Rejected",
    }));
  };

  const productsToDisplay = isExpanded
    ? order.products
    : order.products.slice(0, 2);

  return (
    <div className="mb-4 p-4 w-75 mx-auto">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {productsToDisplay.map((product) => (
          <div key={product.id} className="col">
            <Link
              style={{ textDecoration: "none" }}
              to={`/product/${product.id}`}
            >
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <Card.Body className="d-flex flex-column">
                  <div>
                    <Card.Title className="text-truncate fw-bold">
                      {product.title}
                    </Card.Title>
                    <Card.Text className="one-line-truncate">
                      <span className="fw-semibold text-decoration-underline">
                        {" "}
                        Description:
                      </span>{" "}
                      {product.description}
                    </Card.Text>
                  </div>
                  <div className="">
                    <Card.Text className="text-success fw-semibold">
                      Price: {product.price}$
                    </Card.Text>

                    <div className="my-3">
                      <hr style={{ borderColor: "#000" }} />
                    </div>
                    {product.status !== "Shipped" && (
                      <Card.Text className="fw-semibold">
                        Status: {productStatus[product.id] || product.status}
                      </Card.Text>
                    )}
                    {product.status === "Shipped" && (
                      <div className="d-flex flex-row justify-content-between">
                        <Card.Text className="fw-semibold">
                          Status: {productStatus[product.id] || product.status}
                        </Card.Text>
                        <div>
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => handleAccept(product.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleReject(product.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
      {order.products.length > 2 && (
        <div className="d-flex justify-content-center text-center mt-4 ">
          <Button variant="" onClick={toggleExpansion} className="fw-semibold">
            {isExpanded ? (
              <>
                Show Less <CaretUpFill size={20} />
              </>
            ) : (
              <>
                Show More <CaretDownFill size={20} />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Order;
