import React, { useEffect, useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { PlusCircleFill, TrashFill } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";

export const CategoryModal = (props) => {
  const { category } = props;
  const [subCategoriesNames, setSubCategoriesName] = useState(
    category.subCategoriesNames
  );
  const [subCategories, setSubCategories] = useState(category.subCategories);

  // using useEffect to reset to default value when turn off modal
  useEffect(() => {
    if (!props.show) {
      setSubCategoriesName(category.subCategoriesNames);
      setSubCategories(category.subCategories);
    }
  }, [props.show, category.subCategoriesNames, category.subCategories]);

  const handleDeleteSubCategory = (subCategoryId, index) => {
    const updatedSubCategories = subCategories.filter(
      (subCategory) => subCategory !== subCategoryId
    );
    setSubCategories(updatedSubCategories);
    const updatedSubCategoryNames = subCategoriesNames.filter(
      (subCategoryName, subCategoryIndex) => subCategoryIndex !== index
    );
    setSubCategoriesName(updatedSubCategoryNames);
  };

  const extraAttributes = Object.keys(category).filter(
    (key) =>
      key !== "name" &&
      key !== "admins" &&
      key !== "subCategories" &&
      key !== "subCategoriesNames" &&
      key !== "adminId" &&
      key !== "_id" &&
      key !== "__v" &&
      key !== "parentId"
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${category.name.toUpperCase()} INFORMATION`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" defaultValue={category.name} />
          </Form.Group>

          {extraAttributes.map((attribute, index) => {
            return (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>{attribute}</Form.Label>
                <Form.Control type="text" defaultValue={category[attribute]} />
              </Form.Group>
            );
          })}

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
                <Button variant="light" className="rounded-end">
                  <PlusCircleFill
                    size={15}
                    style={{
                      color: "green",
                    }}
                  />
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
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
