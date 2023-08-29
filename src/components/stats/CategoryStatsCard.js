import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ArrowClockwise, Boxes } from "react-bootstrap-icons";
import { useGetAllCategory } from "../../api/getAllCategory";

export const CategoryStatsCard = () => {
  const { count, setRefresh } = useGetAllCategory();
  const handleRefreshCategory = () => {
    setRefresh(true);
  };

  return (
    <Row className="h-100">
      <Col>
        <Card className="card-stats">
          <Card.Body>
            <Row>
              <Col xs="5">
                <div className="text-center">
                  <Boxes style={{ fontSize: "3rem", color: "darkblue" }} />
                </div>
              </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">Total Categories</p>
                  <Card.Title as="h4">{count}</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <hr></hr>
            <button
              className="border-0 px-2 py-1 rounded-2"
              onClick={handleRefreshCategory}
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
