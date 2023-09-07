import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { useDeleteProduct } from "../../api/deleteProduct";
import { ProductDeleteModal } from "../modal/SellerDeleteProductModal";
import { useModal } from "../../hooks/modal";
import { useModalContext } from "../../store/modalContext";
import { ProductUpdateModal } from "../modal/SellerUpdateProductModal";
import { useGetAllCategory } from "../../api/getAllCategory";
import { useGetSellerProduct } from "../../api/getSellerProduct";
import { useGetImageFromID } from "../../api/getImageFromID";

function ProductCardSeller(props) {
  const { product } = props;
  const { fetchSellerProduct } = useGetSellerProduct();
  const { openModal: openModalGlobal, closeModal } = useModalContext();
  const { categories, isLoading } = useGetAllCategory();
  const { getProductImage } = useGetImageFromID();

  const [imageURL, setImageURL] = useState("");
  const [productNew, setProductNew] = useState(product);

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
    // fetchSellerProduct();
  }, [product, closeModal]);

  useEffect(() => {
    // Call your function to get the image blob here
    getProductImage(product._id)
      .then((url) => {
        setImageURL(url);
        fetchSellerProduct();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [product]);

  // useEffect(() => {
  //   getProductImage(String(localStorage.getItem('_id').slice(1, -1))); // Use the converted userId
  // }, []);

  // const extraAttributes = Object.keys(product).filter(
  //   (key) =>
  //     key !== "name" &&
  //     key !== "admins" &&
  //     key !== "subCategories" &&
  //     key !== "adminId" &&
  //     key !== "_id" &&
  //     key !== "__v" &&
  //     key !== "parentId" &&
  //     key !== "subCategoryNames"
  // );

  // console.log("extraAttributes", extraAttributes);

  const currentProduct = () => {
    console.log("product", product);
    console.log("productNew", productNew);
  };

  return (
    <Card style={{ objectFit: "cover", width: "250px" }}>
      <Card.Body className="d-flex flex-column">
        {product.image == "" ? (
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
          <Card.Title className="text-truncate">{product.title}</Card.Title>
          <Card.Text className="multi-line-truncate">
            Description: {product.description}
          </Card.Text>
          <Card.Text>Price: ${product.price}</Card.Text>
          <Card.Text>Stock: {product.stock}</Card.Text>
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

          <Button
            variant="primary"
            size="md"
            className="ms-auto"
            onClick={currentProduct}
          >
            Detail
          </Button>
        </div>
      </Card.Body>
      <ProductDeleteModal
        show={showDeleteModal}
        onHide={closeDeleteModal}
        product={productNew}
      />

      <ProductUpdateModal
        show={showUpdateModal}
        onHide={closeUpdateModal}
        product={product}
      />
    </Card>
  );
}

export default ProductCardSeller;
