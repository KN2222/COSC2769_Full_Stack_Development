import React, { useRef, useState } from "react";
import { Card, ListGroup, Button, Stack } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useModal } from "../../hooks/modal";
import { CategoryModal } from "../modal/CategoryModal";
import { useModalContext } from "../../store/modalContext";

export const CategoryCard = ({ category }) => {
  const { showModal, openModal, closeModal } = useModal();
  const { openModal: openModalGlobal } = useModalContext();

  const handleClick = (categoryId) => {
    // select Card category have the id is categoryId
    console.log("categoryId", categoryId);
    const card = document.getElementById(categoryId);
    console.log("card", card);
    if (card) {
      console.log("Scrolling to card:", card);
      card.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else {
      console.log("Card element not found.");
    }
  };

  const extraAttributes = Object.keys(category).filter(
    (key) =>
      key !== "name" &&
      key !== "admins" &&
      key !== "subCategories" &&
      key !== "adminId" &&
      key !== "_id" &&
      key !== "__v" &&
      key !== "parentId" &&
      key !== "subCategoriesNames"
  );

  return (
    <>
      <Card border="dark" className="h-100 " id={category._id}>
        <Card.Body>
          <Stack>
            <Button
              variant="light"
              className="rounded-end ms-auto"
              onClick={() => {
                openModalGlobal();
                openModal();
              }}
            >
              <PencilSquare size={15} />
            </Button>
          </Stack>

          <Card.Title>
            <h3>{category.name}</h3>
          </Card.Title>
          <ListGroup className="list-group-flush">
            {extraAttributes.map((attribute, index) => {
              return (
                <ListGroup.Item key={index}>
                  {attribute}: {category[attribute]}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <Card.Text>
            <h6>Modify By:</h6>
          </Card.Text>
          <ListGroup horizontal className=" flex-wrap">
            {category.admins.map((admin, index) => {
              return <ListGroup.Item key={index}>{admin}</ListGroup.Item>;
            })}
          </ListGroup>
        </Card.Body>

        <Card.Body>
          <Card.Text>
            <h6>Subcategories:</h6>
          </Card.Text>
          <div className="d-flex flex-wrap gap-1">
            {category.subCategoriesNames.map((subCategory, index) => {
              return (
                <Button
                  key={index}
                  variant="primary"
                  onClick={() => handleClick(category.subCategories[index])}
                >
                  {subCategory}
                </Button>
              );
            })}
          </div>
        </Card.Body>
      </Card>
      <CategoryModal show={showModal} onHide={closeModal} category={category} />
    </>
  );
};
