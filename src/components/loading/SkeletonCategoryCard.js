import React from "react";
import { Card, Placeholder, ListGroup } from "react-bootstrap";
export const SkeletonCategoryCard = () => {
  return (
    <Card border="dark" className="h-100 ">
      <Placeholder as={Card.Body} animation="glow">
        <Placeholder xs={12} className="h-50" />

        <Placeholder as={Card.Title} animation="glow" />
        <Placeholder
          as={ListGroup}
          className="list-group-flush"
          animation="glow"
        >
          <Placeholder as={ListGroup.Item} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder as={ListGroup.Item} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder  animation="glow" />
        </Placeholder>
      </Placeholder>

      <Placeholder as={Card.Body} animation="glow">
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder  animation="glow" />
        </Placeholder>
        <div className="d-flex flex-wrap gap-1">
          <Placeholder.Button
            variant="primary"
            animation="glow"
            xs={3}
            className="p-2"
          />
          <Placeholder.Button
            variant="primary"
            animation="glow"
            xs={4}
            className="p-2"
          />
        </div>
      </Placeholder>
    </Card>
  );
};
