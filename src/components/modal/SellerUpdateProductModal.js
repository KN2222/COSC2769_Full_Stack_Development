import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useCreateProduct } from "../../api/createProduct";
import { useGetAllCategory } from "../../api/getAllCategory";
import { useToastContext } from "../../store/toastContext";

export const UpdateProductModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(-1);
  const [stock, setStock] = useState(-1);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const { showToast } = useToastContext();
  const { isSuccess, createProduct } = useCreateProduct();
  const {categories} = useGetAllCategory();
  const form = useRef(null);

  const handleCreateProduct = (e) => {
    if (form.current.checkValidity() === false || price === -1 || stock === -1 || title === "" || description === "" || category === "" || file === null) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Please fill out all the fields");
    }else if(price <= 0 ){
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Price must be greater than or equal to 0");
    }else if(stock < 0){
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Stock must be greater than 0");
    } else {
      createProduct(title, description, price, stock, category, file);
      setCategory("");
      setFile(null);
      props.onHide();
    }
  };

  const handleClose = () => {
    props.onHide(); 
    setCategory(""); 
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="w-100"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Create new Product
        </Modal.Title>
        <Modal.Body>
          <Form noValidate ref={form}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price($)</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setPrice(e.target.value);
                  }
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setStock(e.target.value);
                  }
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select a category:</Form.Label>
              <p className="text-danger">
                By selecting a category, it will also select its parent
              </p>
              <Form.Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                custom="true"
              >
                <option value="">Choose...</option>

                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <br />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload image product here:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button type="submit" variant="primary" onClick={handleCreateProduct}>
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal.Header>
    </Modal>
  );
};
