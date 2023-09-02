import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useGetSellerByID } from "../../../api/getSellerByID";
import { useNavigate } from "react-router-dom";

export default function Status() {
  const { status } = useGetSellerByID();
  const navigate = useNavigate();

  useEffect(() => {
    if(status === "Approved") {
      console.log(status);  
      navigate("/seller/home");
    }
    return () => {};
  }, [status]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="text-center">
        <Card.Header className="fs-5 fw-medium">Your Status</Card.Header>
        <Card.Body>
          {status === "Pending" ? (
            <div>
              <Card.Title className="fs-1 text-warning">{status}</Card.Title>
              <Card.Text>
                You need to wait for admin to approve your account.
              </Card.Text>
            </div>
          ) : (
            <div>
              <Card.Title className="fs-1 text-danger">{status}</Card.Title>
              <Card.Text>
                Your account has been rejected. Please contact admin for more
                information.
              </Card.Text>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
