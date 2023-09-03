import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useCreateProduct } from "../../api/createProduct";

export const CreateProductModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const [validated, setValidated] = useState(false);

  const { isSuccess, createProduct } = useCreateProduct();
  const form = useRef(null);

  const handleCreateProduct = (e) => {
    if (form.current.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      createProduct(title, description, price, stock, category, file);
      setValidated(true);
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
                  console.log(e.target.value);
                }}
                custom="true"
              >
                <option value="">Choose...</option>
                <option value="64f076aa00ab20286931417f">Male Top</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal.Header>
    </Modal>
  );
};
