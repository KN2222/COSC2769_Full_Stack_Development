import React, { useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useGetAllCategory } from "../../api/getAllCategory";
import { useToastContext } from "../../store/toastContext";
import { useUpdateProduct } from "../../api/updateProduct";
import { useGetSellerProduct } from "../../api/getSellerProduct";

export const ProductUpdateModal = (props) => {
  const [title, setTitle] = useState(props.product.title);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const [stock, setStock] = useState(props.product.stock);
  const [categoryId, setCategory] = useState(props.category);
  const [file, setFile] = useState();

  const { updateProduct } = useUpdateProduct();
  const { showToast } = useToastContext();
  const { categories } = useGetAllCategory();
  const { product, fetchSellerProduct } = useGetSellerProduct();
  const form = useRef(null);

  const handleUpdateProduct = async (e) => {
    if (
      form.current.checkValidity() === false ||
      price === -1 ||
      stock === -1 ||
      title === "" ||
      description === ""
    ) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Please fill out all the fields");
    } else if (price <= 0) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Price must be greater than or equal to 0");
    } else if (stock < 0) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Stock must be greater than 0");
    } else { 
      try{
        console.log("before Update",          title,
          description,
          price,
          stock,
          categoryId);
        await updateProduct(props.product._id, {
          title,
          description,
          price,
          stock,
          categoryId,
        }, file);
        setCategory("");
        props.onHide();
      } catch (error) {
        console.error("Error updating product:", error);
      }

    }
  };

  const handleClose = () => {
    props.onHide();
    setCategory(""); 
    setFile(null);
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
          Update Product
        </Modal.Title>
        <Modal.Body>
          <Form noValidate ref={form}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
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
                value={price}
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
                value={stock}
                type="number"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setStock(e.target.value);
                  }
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select new category if needed:</Form.Label>
              <Form.Select
                defaultValue=""
                onChange={(e) => {
                  setCategory(String(e.target.value));
                }}
                custom="true"
              >
                <option value="" disabled>
                  Choose...
                </option>

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
              <Form.Label>Upload new image here if needed:</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button type="submit" variant="primary" onClick={handleUpdateProduct}>
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal.Header>
    </Modal>
  );
};
