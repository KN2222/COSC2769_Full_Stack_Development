import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDeleteProduct } from "../../api/deleteProduct";
import { ProductDeleteModal } from "../modal/SellerDeleteProductModal";
import { useModal } from "../../hooks/modal";
import { useModalContext } from "../../store/modalContext";
import { useGetSellerProduct } from "../../api/getSellerProduct";

function ProductCardSeller() {
  const { products, fetchSellerProduct } = useGetSellerProduct();
  const { deleteProduct } = useDeleteProduct();
  const { openModal: openModalGlobal } = useModalContext();
  const {
    showModal: showDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  useEffect(() => {
    fetchSellerProduct();
  }, [products]);

  return (
    <div>
      {products.map((product) => {
        return (
          <div key={product._id} className="col">
            {/* <Link style={{ textDecoration: "none" }} to={`/product/${product.id}`}> */}
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
                  variant="top"
                  src={`http://localhost:8000/product/${product._id}.png`}
                  alt={product.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <div>
                  <Card.Title className="text-truncate">
                    {product.title}
                  </Card.Title>
                  <Card.Text className="multi-line-truncate">
                    {product.description}
                  </Card.Text>
                </div>
                <div className="mt-auto">
                  <Card.Text>Price: ${product.price}</Card.Text>
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
                    fetchSellerProduct = {fetchSellerProduct}
                  />
                </div>
              </Card.Body>
            </Card>
            {/* </Link> */}
          </div>
        );
      })}
    </div>
  );
}

export default ProductCardSeller;
