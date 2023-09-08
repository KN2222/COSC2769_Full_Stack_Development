import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useGetAllCategory } from "../../api/getAllCategory";
import { useToastContext } from "../../store/toastContext";
import { useUpdateProduct } from "../../api/updateProduct";
import { useDeleteProduct } from "../../api/deleteProduct";


export const ProductCategoryAttributeModal = (props) => {
  const { product } = props;
  const filteredAttributes = [
    "title",
    "description",
    "price",
    "stock",
    "categories",
    "_id",
    "image",
    "seller",
    "date",
    "__v",
  ];
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [file, setFile] = useState();
  const [attributeValues, setAttributeValues] = useState();

  const { updateProduct } = useUpdateProduct();
  const { showToast } = useToastContext();
  const { categories } = useGetAllCategory();
  const form = useRef(null);

//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//         const productDiv = document.getElementById(product._id);
//       if (!e.target.closest(`#${product._id}`)) {
//         document.removeEventListener('click', handleOutsideClick);
//         handleClose() // Clicked outside
//         document.removeEventListener('click', handleOutsideClick);
//       }
//     };

//     document.addEventListener('click', handleOutsideClick);

//     return () => {
//       document.removeEventListener('click', handleOutsideClick);
//     };
//   }, []);

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
      try {
        const mergedAttributes = {
          ...{title,description,price,stock,},
          ...attributeValues,
        };
        await updateProduct(
          props.product._id,
          mergedAttributes,
          file
        );
        props.onHide();
        props.createModalClose();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const seeDetails = () => {
    const mergedAttributes = {
      ...{
        title,
        description,
        price,
        stock,
        // categoryId,
      },
      ...attributeValues,
    };
    console.log("mergedAttributes", mergedAttributes);
  };

  const { deleteProduct } = useDeleteProduct();
  const handleClose = async() => {
    try{
        await deleteProduct(props.product._id);
        props.onHide();
        // props.createModalClose();
    }catch (error) {
        console.error("Error deleting product:", error);
    }
  };


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="w-100"
      centered
      style={{ zIndex: "9999" }}
      id={product._id}
    >
      <Modal.Header  className="d-flex flex-column justify-content-center">
        <Modal.Title id="contained-modal-title-vcenter">
          Add Attribute
        </Modal.Title>
        <Modal.Body>
          <Form noValidate ref={form}>
            {Object.keys(product)
              .filter((attribute) => !filteredAttributes.includes(attribute))
              .map((attribute) => (
                <Form.Group key={attribute} className="mb-3">
                  <Form.Label>{attribute}</Form.Label>
                  <Form.Control
                    defaultValue={typeof product[attribute] === 'number' ? 1 : ''}
                    type={typeof product[attribute] === 'number' ? 'number' : 'text'}
                    onChange={(e) => {
                      const updatedAttributeValues = {
                        ...attributeValues,
                        [attribute]: e.target.value,
                      };
                      setAttributeValues(updatedAttributeValues);
                    }}
                  />
                </Form.Group>
              ))}
            <br />
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button type="submit" variant="primary" onClick={handleUpdateProduct}>
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={seeDetails}>Detail</Button>
        </Modal.Footer>
      </Modal.Header>
    </Modal>
  );
};
