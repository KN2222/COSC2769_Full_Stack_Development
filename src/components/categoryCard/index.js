import React, { useRef, useState } from 'react';
import { Card, ListGroup, Button, Stack } from 'react-bootstrap';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { useModal } from '../../hooks/modal';
import { useModalContext } from '../../store/modalContext';
import { CategoryUpdateModal } from '../modal/CategoryUpdateModal';
import { CategoryDeleteModal } from '../modal/CategoryDeleteModal';

export const CategoryCard = ({ category }) => {
  const {
    showModal: showModalUpdate,
    openModal: openModalUpdate,
    closeModal: closeModalUpdate,
  } = useModal();

  const {
    showModal: showModalDelete,
    openModal: openModalDelete,
    closeModal: closeModalDelete,
  } = useModal();

  const { openModal: openModalGlobal } = useModalContext();

  const handleClick = (categoryId) => {
    const card = document.getElementById(categoryId);
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    } else {
      console.log('Card element not found.');
    }
  };

  const extraAttributes = Object.keys(category).filter(
    (key) =>
      key !== 'name' &&
      key !== 'admins' &&
      key !== 'subCategories' &&
      key !== 'adminId' &&
      key !== '_id' &&
      key !== '__v' &&
      key !== 'parentId' &&
      key !== 'subCategoryNames'
  );

  return (
    <>
      <Card
        border='dark'
        className='h-100 '
        id={category._id}
      >
        <Card.Body>
          <Stack
            direction='horizontal'
            className='d-flex-row justify-content-end'
          >
            <Button
              variant='light'
              className='rounded-end'
              onClick={() => {
                openModalGlobal();
                openModalUpdate();
              }}
            >
              <PencilSquare size={15} />
            </Button>
            <div className='vr' />
            <Button
              variant='light'
              className='rounded-end'
              onClick={() => {
                openModalGlobal();
                openModalDelete();
              }}
            >
              <TrashFill size={15} />
            </Button>
          </Stack>

          <Card.Title>
            <h3>{category.name}</h3>
          </Card.Title>
          <ListGroup className='list-group-flush'>
            {extraAttributes.map((attribute, index) => {
              return (
                <ListGroup.Item key={index}>
                  {attribute}: {category[attribute]}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <Card.Text
            as={'h6'}
            className='py-2'
          >
            Modify By
          </Card.Text>
          <ListGroup
            horizontal
            className=' flex-wrap'
          >
            {category.admins.map((admin, index) => {
              return <ListGroup.Item key={index}>{admin}</ListGroup.Item>;
            })}
          </ListGroup>
        </Card.Body>

        <Card.Body>
          <Card.Text
            as={'h6'}
            className='py-2'
          >
            Subcategories:
          </Card.Text>
          <div className='d-flex flex-wrap gap-1'>
            {category.subCategoryNames.map((subCategory, index) => {
              return (
                <Button
                  key={index}
                  variant='primary'
                  onClick={() => handleClick(category.subCategories[index])}
                >
                  {subCategory}
                </Button>
              );
            })}
          </div>
        </Card.Body>
      </Card>
      <CategoryUpdateModal
        show={showModalUpdate}
        onHide={closeModalUpdate}
        category={category}
      />
      <CategoryDeleteModal
        show={showModalDelete}
        onHide={closeModalDelete}
        category={category}
      />
    </>
  );
};
