import React from "react";
import { useModal } from "../../../hooks/modal";
import { useModalContext } from "../../../store/modalContext";
import { CreateProductModal } from "../../../components/modal/SellerCreateProductModal";
import { Button } from "react-bootstrap";
import ProductCardSeller from "../../../components/sellerHome/ProductCardSeller";
import { useGetSellerProduct } from "../../../api/getSellerProduct";

export default function SellerHome() {
    const { openModal: openModalGlobal } = useModalContext();
    const {
        showModal: showCreateModal,
        openModal: openCreateModal,
        closeModal: closeCreateModal,
      } = useModal();
      
    return (
      <div>
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
        <CreateProductModal         
        show={showCreateModal}
        onHide={closeCreateModal}/>
        <hr />
        <ProductCardSeller/>
      </div>
    );
  }