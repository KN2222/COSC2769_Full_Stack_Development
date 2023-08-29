import React, { useEffect, useReducer, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useToastContext } from "../../store/toastContext";
import { CategoryForm } from "../form/CategoryUpdateForm";
import { useCreateCategory } from "../../api/createCategory";
import { CategoryAddForm } from "../form/CategoryAddForm";
const attributeTypeReducer = (state, action) => {
  if (action.type === "number") {
    return { ...state, type: "number" };
  } else if (action.type === "string") {
    return { ...state, type: "string" };
  }
  throw Error("Invalid action type");
};

export const CategoryCreateModal = (props) => {
  const { newCategory, isSuccess, createCategory } = useCreateCategory();
  const [categoryName, setCategoryName] = useState();
  const [isAddNewAttribute, setIsAddNewAttribute] = useState(false);
  const [newAttributes, setNewAttributes] = useState([]);
  const [validated, setValidated] = useState(false);
  const [extraValues, setExtraValues] = useState({});
  const [attributeType, dispatchAttributeType] = useReducer(
    attributeTypeReducer,
    { type: "none" }
  );
  const { showToast } = useToastContext();
  const form = useRef(null);

  useEffect(() => {
    if (isSuccess) {
      showToast(200, "Create Category successfully");
    }
  }, [isSuccess, showToast]);

  useEffect(() => {
    if (!props.show) {
      setNewAttributes([]);
      setIsAddNewAttribute(false);
    }
  }, [props.show]);

  useEffect(() => {
    console.log("extraValues", extraValues);
  }, [extraValues]);

  const handleAddNewAttribute = () => {
    setIsAddNewAttribute(true);
  };

  const handleNewAttributeEnter = (e) => {
    if (e.key === "Enter") {
      console.log("e.target.value", e.target.value);
      if (
        e.target.value &&
        e.target.value.length > 0 &&
        attributeType.type !== "none"
      ) {
        setNewAttributes((prevState) => [
          ...prevState,
          {
            name: e.target.value,
            type: attributeType.type,
          },
        ]);
      }
    }
  };

  const handleCreateCategory = (e) => {
    if (form.current.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      createCategory(categoryName, { ...extraValues });
      setValidated(true);
      setNewAttributes([]);
      props.onHide();
    }
  };

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
          Create new category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryAddForm
          handleAddNewAttribute={handleAddNewAttribute}
          isAddNewAttribute={isAddNewAttribute}
          dispatchAttributeType={dispatchAttributeType}
          handleNewAttributeEnter={handleNewAttributeEnter}
          newAttributes={newAttributes}
          setCategoryName={setCategoryName}
          attributeType={attributeType}
          validated={validated}
          setExtraValues={setExtraValues}
          ref={form}
        />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button type="submit" variant="primary" onClick={handleCreateCategory}>
          Save
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};