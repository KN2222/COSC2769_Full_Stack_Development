import React from "react";
import { Card, Placeholder } from "react-bootstrap";

export const SkeletonProductDetail = () => {
  return (
    <div
      className="w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }} 
    >
      <div className="w-50 row row-cols-1 row-cols-md-2 g-4 justify-content-center">
        <div className="col-md-4" >
          <div
            style={{
              backgroundColor: "#6c757d",
              width: "100%",
              height: "100%",
              animation: "glow 2s infinite",
              
              boxShadow: "0 0 10px rgba(108, 117, 125, 0.5)", 
            }}
          ></div>
        </div>
        <div className="col-md-8">
          <div className="h-100 text-center">
            <Placeholder as={Card.Body} animation="glow">
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>

              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={12} />
              </Placeholder>

              <Placeholder.Button
                variant="primary"
                animation="glow"
                xs={3}
                className="p-3"
              ></Placeholder.Button>
            </Placeholder>
          </div>
        </div>
      </div>
    </div>
  );
};
