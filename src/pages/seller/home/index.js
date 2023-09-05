import React from "react";
import { useModal } from "../../../hooks/modal";
import { useModalContext } from "../../../store/modalContext";
import { CreateProductModal } from "../../../components/modal/SellerCreateProductModal";
import { Button, Container, Stack } from "react-bootstrap";
import ProductCardSeller from "../../../components/sellerHome/ProductCardSeller";

export default function SellerHome() {
  const { openModal: openModalGlobal } = useModalContext();
  const {
    showModal: showCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  return (
    <>
      <Container>
        <Stack direction="horizontal" className="mb-2 ">
          <Button
            variant="primary"
            size="md"
            className="ms-auto"
            onClick={() => {
              openModalGlobal();
              openCreateModal();
            }}
          >
            Add Product
          </Button>
        </Stack>
        <ProductCardSeller />
      </Container>

      <CreateProductModal show={showCreateModal} onHide={closeCreateModal} />
      <hr />
    </>
  );
}
