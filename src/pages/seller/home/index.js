import React, { useEffect, useState } from 'react';
import { useModal } from '../../../hooks/modal';
import { Button, Container, Stack, Col } from 'react-bootstrap';
import { useAuth } from '../../../store/authContext';
import { useModalContext } from '../../../store/modalContext';
import { useGetSellerProduct } from '../../../api/getSellerProduct';
import ProductCardSeller from '../../../components/sellerHome/ProductCardSeller';
import { CreateProductModal } from '../../../components/modal/SellerCreateProductModal';

const Products = ({ products }) => {
  return (
    <>
      {products.map((product, index) => (
        <Col key={index}>
          <ProductCardSeller product={product} />
        </Col>
      ))}
    </>
  );
};

export default function SellerHome() {
  const { products, fetchSellerProduct } = useGetSellerProduct();
  const { getProfile } = useAuth();
  const {
    openModal: openModalGlobal,
    showModal,
    closeModal,
  } = useModalContext();
  const {
    showModal: showCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const [profile, setProfile] = useState('');

  useEffect(() => {
    fetchSellerProduct();
  }, [closeModal]);

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
        <Stack
          direction='horizontal'
          className='mb-2 '
        >
          <h1>{profile.businessName}</h1>
          <Button
            variant='primary'
            size='md'
            className='ms-auto'
            onClick={() => {
              openModalGlobal();
              openCreateModal();
            }}
          >
            Add Product
          </Button>
          <CreateProductModal
            show={showCreateModal}
            onHide={closeCreateModal}
          />
        </Stack>
        <hr />
        <Products products={products} />
      </Container>
    </>
  );
}
