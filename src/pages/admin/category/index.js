import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Stack, Button } from 'react-bootstrap';
import { CategoryCard } from '../../../components/categoryCard';
import { SkeletonCategoryCard } from '../../../components/loading/SkeletonCategoryCard';
import { useModalContext } from '../../../store/modalContext';
import { useGetAllCategory } from '../../../api/getAllCategory';
import { useModal } from '../../../hooks/modal';
import { CategoryCreateModal } from '../../../components/modal/CategoryCreateModal';

const Categories = ({ categories }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Col key={index}>
          <CategoryCard category={category} />
        </Col>
      ))}
    </>
  );
};

export const AdminCategoryPage = () => {
  const { categories, isLoading } = useGetAllCategory();
  const { openModal: openModalGlobal } = useModalContext();
  const {
    showModal: showCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  return (
    <>
      <Container>
        <Stack
          direction='horizontal'
          className='mb-2 '
        >
          <Button
            variant='primary'
            size='md'
            className='ms-auto'
            onClick={() => {
              openModalGlobal();
              openCreateModal();
            }}
          >
            Add Category
          </Button>
        </Stack>
        <Row className='row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
          {isLoading &&
            [...Array(12)].map((_, index) => (
              <Col key={index}>
                <SkeletonCategoryCard />
              </Col>
            ))}

          {categories.length > 0 && <Categories categories={categories} />}
        </Row>
      </Container>
      <CategoryCreateModal
        show={showCreateModal}
        onHide={closeCreateModal}
      />
    </>
  );
};
