import React, { useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
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
   const {fetchSellerProduct } = useGetSellerProduct();
  const { openModal: openModalGlobal } = useModalContext();
  const { categories, isLoading } = useGetAllCategory();

  // const { productImage, setProductImage, getProductImage } = useGetImageFromID();

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
    console.log("In use Effect");
    fetchSellerProduct();

  }, [showDeleteModal, showUpdateModal]);

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

  return (
    <>
      <Card className="h-100 d-flex flex-column justify-content-between">
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
            src={`http://localhost:8000/product/${product._id}.png`}
            alt={product.title}
            style={{ objectFit: "cover", height: "200px" }}
          />
        )}
        <Card.Body className="d-flex flex-column">
          <div>
            <Card.Title className="text-truncate">{product.title}</Card.Title>
            <Card.Text className="multi-line-truncate">
              {product.description}
            </Card.Text>
          </div>
          <div className="mt-auto">
            <Card.Text>Price: ${product.price}</Card.Text>
            <Card.Text>Stock: {product.stock}</Card.Text>
            <Button
              variant="primary"
              size="md"
              className="ms-auto"
              onClick={() => {
                openModalGlobal();
                openDeleteModal();
              }}
            >
              Delete
            </Button>
            <ProductDeleteModal
              show={showDeleteModal}
              onHide={closeDeleteModal}
              product={product}
            />

            <Button
              variant="primary"
              size="md"
              className="ms-auto"
              onClick={() => {
                openModalGlobal();
                openUpdateModal();
              }}
            >
              Update
            </Button>
            <ProductUpdateModal
              show={showUpdateModal}
              onHide={closeUpdateModal}
              product={product}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProductCardSeller;
