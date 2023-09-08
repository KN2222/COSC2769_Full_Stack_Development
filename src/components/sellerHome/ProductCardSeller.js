import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { ProductDeleteModal } from "../modal/SellerDeleteProductModal";
import { useModal } from "../../hooks/modal";
import { useModalContext } from "../../store/modalContext";
import { ProductUpdateModal } from "../modal/SellerUpdateProductModal";
import { useGetImageFromID } from "../../api/getImageFromID";

function ProductCardSeller({ product }) {
  const { openModal: openModalGlobal } = useModalContext();
  const { getProductImage } = useGetImageFromID();

  const [imageURL, setImageURL] = useState("");

  const {
    showModal: showDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const {
    showModal: showUpdateModal,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();

  useEffect(() => {
    // Call your function to get the image blob here
    getProductImage(product._id)
      .then((url) => {
        setImageURL(url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [product]);

  // const seeDetails = () => {
  //   console.log("See details", product);
  // }

  const filteredAttributes = ['title', 'description', 'price', 'stock', 'categories', '_id', 'image', 'seller', 'date', '__v'];

  return (
    <>
      <Card style={{ objectFit: "cover", width: "280px" }}>
        <Card.Body className="d-flex flex-column">
          {product.image === "" ? (
            <Card.Img
              variant="top"
              src={"http://localhost:8000/product/no-image.png"}
              alt={product.title}
              style={{ objectFit: "cover", height: "200px" }}
            />
          ) : (
            <Card.Img
              // id={`product-${product._id}`}
              variant="top"
              src={imageURL}
              alt={product.title}
              style={{ objectFit: "cover", height: "200px" }}
            />
          )}
          <div>
            <Card.Title className="text-truncate d-flex justify-content-center">{product.title}</Card.Title>
            <Card.Text className="multi-line-truncate">
              Description: {product.description}
            </Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Stock: {product.stock}</Card.Text>
            {Object.keys(product)
            .filter((attribute) => !filteredAttributes.includes(attribute))
            .map((attribute) => (
              <Card.Text key={attribute}>
                {attribute}: {product[attribute]}
              </Card.Text>
            ))}
          </div>

          <div className="mt-auto d-flex justify-content-center">
            <Button
              variant="primary"
              size="md"
              className="ms-auto"
              onClick={() => {
                openModalGlobal();
                openUpdateModal();
              }}
            >
              <PencilSquare size={15} />
            </Button>

            <Button
              variant="primary"
              size="md"
              className="ms-auto"
              onClick={() => {
                openModalGlobal();
                openDeleteModal();
              }}
            >
              <TrashFill size={15} />
            </Button>

            {/* <Button variant="primary" size="md" className="ms-auto" onClick={seeDetails}>Inspect</Button> */}
          </div>
        </Card.Body>
      </Card>
      <ProductDeleteModal
        show={showDeleteModal}
        onHide={closeDeleteModal}
        product={product}
      />

      <ProductUpdateModal
        show={showUpdateModal}
        onHide={closeUpdateModal}
        product={product}
      />
    </>
  );
}

export default ProductCardSeller;
