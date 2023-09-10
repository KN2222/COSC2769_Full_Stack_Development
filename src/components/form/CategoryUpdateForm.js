import React, { useEffect, useState } from "react";
import { Form, ListGroup, Button, FormControl } from "react-bootstrap";
import { PlusCircleFill, TrashFill } from "react-bootstrap-icons";

export const CategoryUpdateForm = React.forwardRef(
  (
    {
      category,
      subCategoriesNames,
      handleDeleteSubCategory,
      handleAddNewSubCategory,
      isAddNewSubCategory,
      handleNewSubCategoryEnter,
      handleAddNewAttribute,
      isAddNewAttribute,
      dispatchAttributeType,
      handleNewAttributeEnter,
      extraAttributes,
      validated,
      newAttributes,
      setCategoryName,
      setExtraValues,
      attributeType,
    },
    ref
  ) => {
    return (
      <Form noValidate validated={validated} ref={ref}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            required
            type="text"
            isInvalid={category.name === "" || category.name === undefined}
            defaultValue={category.name}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Category Name.
          </Form.Control.Feedback>
        </Form.Group>
        <h5 className="text-success">Current Attributes:</h5>
        {extraAttributes.map((attribute, index) => {
          return (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{attribute}</Form.Label>
              <Form.Control
                type={
                  typeof category[attribute] === "string" ? "text" : "number"
                }
                defaultValue={category[attribute]}
                onChange={(e) => {
                  setExtraValues((prevState) => ({
                    ...prevState,
                    [attribute]: e.target.value,
                  }));
                }}
              />
            </Form.Group>
          );
        })}

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

        <Form.Label>Sub Categories:</Form.Label>
        <Form.Group className="mb-3">
          <ListGroup>
            {subCategoriesNames.map((subCategoryName, index) => (
              <ListGroup.Item key={category.subCategories[index]}>
                {subCategoryName}
                <Button
                  variant="light"
                  className="rounded-end float-end"
                  onClick={() =>
                    handleDeleteSubCategory(
                      category.subCategories[index],
                      index
                    )
                  }
                >
                  <TrashFill size={15} />
                </Button>
              </ListGroup.Item>
            ))}

            <ListGroup.Item className="text-center">
              <Button
                variant="light"
                className="rounded-end"
                onClick={handleAddNewSubCategory}
              >
                <PlusCircleFill
                  size={15}
                  style={{
                    color: "green",
                  }}
                />
                {isAddNewSubCategory && (
                  <>
                    <Form.Control
                      type="text"
                      required
                      autoFocus
                      className="m-1"
                      placeholder="New Subcategory"
                      onKeyDown={handleNewSubCategoryEnter}
                    />
                    <span className="text-success">"Enter" to confirm</span>
                  </>
                )}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Form.Group>

        <fieldset disabled>
          <Form.Group className="mb-3">
            <Form.Label>Admins modify:</Form.Label>
            {category.admins.map((admin, index) => {
              return (
                <Form.Control
                  key={index}
                  type="text"
                  defaultValue={admin}
                  autoFocus
                  className="m-1"
                />
              );
            })}
          </Form.Group>
        </fieldset>
      </Form>
    );
  }
);
