import React, { useEffect, useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { PlusCircleFill, TrashFill } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import { useCreateSubCategory } from "../../api/createSubCategory";
import { useUpdateCategory } from "../../api/updateCategory";
import { useModalContext } from "../../store/modalContext";
import { useGetAllCategory } from "../../api/getAllCategory";

export const CategoryModal = (props) => {
  const { closeModal } = useModalContext();
  const { createSubCategory } = useCreateSubCategory();
  const { updateCategory } = useUpdateCategory();
  const { category } = props;
  const [categoryName, setCategoryName] = useState(category.name);
  const [subCategoriesNames, setSubCategoriesName] = useState(
    category.subCategoriesNames
  );
  const [subCategories, setSubCategories] = useState(category.subCategories);
  const [isAddNewSubCategory, setIsAddNewSubCategory] = useState(false);
  const [newSubCategories, setNewSubCategories] = useState([]);
  const [validated, setValidated] = useState(false);
  const [extraValues, setExtraValues] = useState({});

  useEffect(() => {
    console.log("newSubCategories", newSubCategories);
    if (newSubCategories.length > 0) {
      setSubCategoriesName((prevState) => [
        ...prevState,
        newSubCategories[newSubCategories.length - 1],
      ]);
    }
  }, [newSubCategories]);

  useEffect(() => {
    console.log("extraValues", extraValues);
  }, [extraValues]);

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

  const handleAddNewSubCategory = () => {
    setIsAddNewSubCategory(true);
  };

  const handleNewSubCategoryEnter = (e) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        setNewSubCategories((prevState) => [...prevState, e.target.value]);
      }
      setIsAddNewSubCategory(false);
    }
  };

  const handleUpdateCategory = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    updateCategory(category._id, {
      name: categoryName,
      ...extraValues,
    });

    if (newSubCategories.length > 0) {
      newSubCategories.forEach((subCategoryName) => {
        createSubCategory({
          name: subCategoryName,
          parentId: category._id,
        });
      });
    }
    setValidated(true);
    closeModal();
    props.onHide();
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
      className="w-100"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${category.name.toUpperCase()} INFORMATION`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={category.name}
              required
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Category Name.
            </Form.Control.Feedback>
          </Form.Group>

          {extraAttributes.map((attribute, index) => {
            return (
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>{attribute}</Form.Label>
                <Form.Control
                  type="text"
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
                    <Form.Control
                      type="text"
                      required
                      autoFocus
                      className="m-1"
                      placeholder="New Subcategory"
                      onKeyDown={handleNewSubCategoryEnter}
                    />
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
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button type="submit" variant="primary" onClick={handleUpdateCategory}>
          Save
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
