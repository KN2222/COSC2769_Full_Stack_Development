import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useGetAllCategory } from "../../api/getAllCategory";
import { useToastContext } from "../../store/toastContext";
import { useUpdateProduct } from "../../api/updateProduct";

export const ProductUpdateModal = (props) => {
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
  // const [categoryId, setCategory] = useState(product.categories[0]);
  const [file, setFile] = useState();
  const [attributeValues, setAttributeValues] = useState();

  const { updateProduct } = useUpdateProduct();
  const { showToast } = useToastContext();
  const { categories } = useGetAllCategory();
  const form = useRef(null);

  const handleUpdateProduct = async (e) => {
    if (price <= 0) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Price must be greater than or equal to 0");
    }else if (price.toString().split(".")[1]?.length > 2) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Price should have at most two decimal places");
    } else if (stock <= 0) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Stock must be greater than 0");
    } else if (
      price === "" ||
      stock === "" ||
      title === "" ||
      description === ""
    ) {
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Please fill out all the fields");
    }else if (form.current.checkValidity() === false){
      e.preventDefault();
      e.stopPropagation();
      showToast(400, "Stock shoud be a whole number");
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
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const seeDetails = () => {
    console.log("From product pass in");
    console.log(product);
    console.log("Inside Use State");
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

  useEffect(() => {
    setTitle( product.title);
    setDescription( product.description);
    setPrice( product.price);
    setStock( product.stock);
    // setCategory( product.categories[0]);
    setAttributeValues({});
  }, [product]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="w-100"
      centered
    >
      <Modal.Header  className="d-flex flex-column justify-content-center">
        <Modal.Title id="contained-modal-title-vcenter">
          Update Product
        </Modal.Title>
        <Modal.Body>
          <Form noValidate ref={form}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={product.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                defaultValue={product.description}
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
                defaultValue={product.price}
                type="number"
                step={0.01}
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
                defaultValue={product.stock}
                type="number"
                step={1}
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    setStock(e.target.value);
                  }
                }}
              />
            </Form.Group>

            {Object.keys(product)
              .filter((attribute) => !filteredAttributes.includes(attribute))
              .map((attribute) => (
                <Form.Group key={attribute} className="mb-3">
                  <Form.Label>{attribute}</Form.Label>
                  <Form.Control
                    defaultValue={product[attribute]}
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

            {/* <Form.Group>
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
            </Form.Group> */}
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
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={seeDetails}>Detail</Button>
        </Modal.Footer>
      </Modal.Header>
    </Modal>
  );
};
