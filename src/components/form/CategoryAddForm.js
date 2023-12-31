import React from "react";
import { Form, ListGroup, Button, FormControl } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

export const CategoryAddForm = React.forwardRef(
  (
    {
      handleAddNewAttribute,
      isAddNewAttribute,
      dispatchAttributeType,
      handleNewAttributeEnter,
      newAttributes,
      setCategoryName,
      attributeType,
      validated,
      setExtraValues,
    },
    ref
  ) => {
    return (
      <Form noValidate validated={validated} ref={ref}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Category Name.
          </Form.Control.Feedback>
        </Form.Group>
            {newAttributes.length<=0?<h6 className="text-danger">Click "+" to add attribute</h6>:<div><h5 className="text-success">Current Attributes:</h5><p>Admin can set a default value for attribute, however seller can change this value later</p>
              </div>}
        {newAttributes.map((attribute, index) => {
          if (attribute.type === "string") {
            return (
              <Form.Group className="mb-3">
                <Form.Label>{attribute.name}</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    setExtraValues((prevState) => ({
                      ...prevState,
                      [attribute.name]: e.target.value,
                    }));
                  }}
                />
              </Form.Group>
            );
          } else {
            return (
              <Form.Group className="mb-3">
                <Form.Label>{attribute.name}</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    setExtraValues((prevState) => ({
                      ...prevState,
                      [attribute.name]: parseFloat(e.target.value),
                    }));
                  }}
                />
              </Form.Group>
            );
          }
        })}

        <Form.Group className="mb-3 ">
          <ListGroup className="d-flex align-items-center">
            <ListGroup.Item className="text-center">
              <Button
                variant="light"
                className="rounded-end"
                onClick={handleAddNewAttribute}
              >
                <PlusCircleFill
                  size={15}
                  style={{
                    color: "green",
                  }}
                />
              </Button>
              <br />
              {isAddNewAttribute && (
                <>
                  <Form.Check
                    type="radio"
                    name="group-1"
                    id="inline-radio-1"
                    label="Number"
                    className="text-start"
                    onClick={() => {
                      dispatchAttributeType({ type: "number" });
                      
                    }}
                  />
                  <Form.Check
                    type="radio"
                    name="group-1"
                    id="inline-radio-2"
                    label="String"
                    className="text-start"
                    onClick={() => {
                      dispatchAttributeType({ type: "string" });
                    
                    }}
                  />
                  <FormControl
                    className="m-1"
                    type="text"
                    placeholder="Add new attribute key"
                    isInvalid={attributeType.type === "none"}
                    isValid={attributeType.type !== "none"}
                    onKeyDown={handleNewAttributeEnter}
                  />
                  <span className="text-success">"Enter" to confirm</span>
                </>
              )}
              
            </ListGroup.Item>
          </ListGroup>
        </Form.Group>
      </Form>
    );
  }
);
