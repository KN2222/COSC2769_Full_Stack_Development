import React, { useEffect, useState } from "react";
import { useModal } from "../../../hooks/modal";
import { Button, Container, Stack, Col, Row } from "react-bootstrap";
import { useAuth } from '../../../store/authContext';
import { useModalContext } from "../../../store/modalContext";
import { useGetSellerProduct } from "../../../api/getSellerProduct";
import ProductCardSeller from "../../../components/sellerHome/ProductCardSeller";
import { CreateProductModal } from "../../../components/modal/SellerCreateProductModal";

const Products = ({ products }) => {
  return (
    <div className="d-flex flex-row flex-wrap ">
      {products.map((product, index) => (
        <Col key={index}>
          <ProductCardSeller product={product} />
        </Col>
      ))}
    </div>
  );
};

export default function SellerHome() {
  const { products, fetchSellerProduct } = useGetSellerProduct();
  const {getProfile } = useAuth();
  const { openModal: openModalGlobal, showModal, closeModal } = useModalContext();
  const {
    showModal: showCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const [profile, setProfile] = useState('');

  useEffect(() => {
    console.log("In use Effect index");
    fetchSellerProduct();
  },[closeModal]);

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
          <Row className='row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
            <CreateProductModal show={showCreateModal} onHide={closeCreateModal} />
          </Row>
        </Stack>
        <hr />
        <Products products={products}/>
      </Container>



    </>
  );
}
