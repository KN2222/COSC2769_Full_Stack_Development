import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CategoryCard } from "../../../components/categoryCard";
import { useGetAllCategory } from "../../../api/getAllCategory";
import { useGetCategoryById } from "../../../api/getCategoryById";
import { SkeletonCategoryCard } from "../../../components/loading/SkeletonCategoryCard";
import { CategoryModal } from "../../../components/modal/CategoryModal";
import { useModal } from "../../../hooks/modal";
import { useModalContext } from "../../../store/modalContext";

export const AdminCategoryPage = () => {
  const {
    categories: data,
    refreshCategories,
    isLoading,
  } = useGetAllCategory();
  const [categories, setCategories] = useState([]);
  const { showModal, openModal, closeModal } = useModalContext();
  const { fetchCategoryById } = useGetCategoryById();

  useEffect(() => {
    if (!showModal) {
      refreshCategories();
    }
  }, [showModal]);

  useEffect(() => {
    const updateCategoriesWithSubcategories = async () => {
      const updatedCategories = await Promise.all(
        data.map(async (category) => {
          const { subCategories, ...otherProperties } = category;
          if (subCategories.length > 0) {
            const subCategoryNames = await Promise.all(
              subCategories.map(async (subCategoryId) => {
                const subCategoryDetails = await fetchCategoryById(
                  subCategoryId
                );
                return subCategoryDetails.name;
              })
            );
            return {
              ...otherProperties,
              subCategories,
              subCategoriesNames: subCategoryNames, // Corrected field name
            };
          }
          return {
            ...otherProperties,
            subCategories,
            subCategoriesNames: [],
          };
        })
      );
      setCategories(updatedCategories);
    };
    if (data) {
      updateCategoriesWithSubcategories();
    }
  }, [fetchCategoryById, data]);

  return (
    <Container>
      <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
        {isLoading &&
          [...Array(12)].map((item, index) => (
            <Col key={index}>
              <SkeletonCategoryCard key={index} />
            </Col>
          ))}

        {categories.map((category, index) => {
          return (
            <Col key={index}>
              <CategoryCard category={category} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
