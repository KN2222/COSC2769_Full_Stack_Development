import React, { useEffect, useState } from "react";
import { useModal } from "../../../hooks/modal";
import { Button, Container, Stack } from "react-bootstrap";
import { useAuth } from '../../../store/authContext';
import { useModalContext } from "../../../store/modalContext";
import { useGetSellerProduct } from "../../../api/getSellerProduct";
import ProductCardSeller from "../../../components/sellerHome/ProductCardSeller";
import { CreateProductModal } from "../../../components/modal/SellerCreateProductModal";


export default function SellerHome() {
  const { products, fetchSellerProduct } = useGetSellerProduct();
  const {getProfile } = useAuth();
  const [profile, setProfile] = useState('');
  const { openModal: openModalGlobal } = useModalContext();
  const {
    showModal: showCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  useEffect(() => {
    console.log("In use Effect index");
    fetchSellerProduct();
  },[openModalGlobal]);

  useEffect(() => {
    // Call getProfile function to log its output
    getProfile('seller')
      .then((userProfile) => {
        setProfile(userProfile.seller);
      })
      .catch((error) => {
        console.error('Error getting user profile:', error);
      });
  }, [getProfile]);


  return (
    <>
      <Container>
        <Stack direction="horizontal" className="mb-2 ">
          <h1>{profile.businessName}</h1>
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
          <CreateProductModal show={showCreateModal} onHide={closeCreateModal} />
        </Stack>
        <hr />
        <ProductCardSeller openModalGlobal={openModalGlobal}/>
      </Container>



    </>
  );
}
