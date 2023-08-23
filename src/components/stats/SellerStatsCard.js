import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ArrowClockwise, PeopleFill } from "react-bootstrap-icons";

export const SellerStatsCard = () => {
  return (
    <Row className="h-100">
      <Col>
        <Card className="card-stats">
          <Card.Body>
            <Row>
              <Col xs="5">
                <div className="text-center">
                  <PeopleFill style={{ fontSize: "3rem", color: "darkblue" }} />
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Total Sellers</p>
                  <Card.Title as="h4">20</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <hr></hr>
            <button
              className="border-0 px-2 py-1 rounded-2"
              // onClick={handleRefreshCategory}
            >
              <ArrowClockwise
                style={{
                  fontSize: "1.5rem",
                  marginRight: "0.5rem",
                }}
              />
              Update Now
            </button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
