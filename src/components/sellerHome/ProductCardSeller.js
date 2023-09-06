import React, { useEffect } from "react";
import { Card , Col} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useDeleteProduct } from "../../api/deleteProduct";
import { ProductDeleteModal } from "../modal/SellerDeleteProductModal";
import { useModal } from "../../hooks/modal";
import { useModalContext } from "../../store/modalContext";
import { ProductUpdateModal } from "../modal/SellerUpdateProductModal";
import { useGetAllCategory } from "../../api/getAllCategory";

function ProductCardSeller( props ) {
  const {products, fetchSellerProduct} = props;
  const { openModal: openModalGlobal } = useModalContext();
  const { categories, isLoading } = useGetAllCategory();

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
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                    category={product.categories[0]}
                    // file={`http://localhost:8000/product/${product._id}.png`}
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
