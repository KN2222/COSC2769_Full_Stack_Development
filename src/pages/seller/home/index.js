import React, { useEffect, useState } from "react";
import { useModal } from "../../../hooks/modal";
import { Button, Container, Stack, Col, Row } from "react-bootstrap";
import { useAuth } from "../../../store/authContext";
import { useModalContext } from "../../../store/modalContext";
import { useGetSellerProduct } from "../../../api/getSellerProduct";
import ProductCardSeller from "../../../components/sellerHome/ProductCardSeller";
import { CreateProductModal } from "../../../components/modal/SellerCreateProductModal";
import SearchBar from "../../../components/landingPage/SearchBar";
import FilterBar from "../../../components/landingPage/FilterBar";

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
  const { products } = useGetSellerProduct();
  const { getProfile } = useAuth();
  const { openModal: openModalGlobal } = useModalContext();
  const {
    showModal: showCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const productsPerPage = 12;

  const [profile, setProfile] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLetter, setFilterLetter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const startIndex = (activePage - 1) * productsPerPage;

  const handleSearch = (query) => {
    setFilterLetter(null);
    setSearchQuery(query);
  };

  useEffect(() => {
    let filteredProducts = products;

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) => {
        const cleanedQuery = searchQuery.trim().toLowerCase();
        if (!cleanedQuery) {
          return true;
        }
        const queryWords = cleanedQuery.split(" ");
        return queryWords.some((queryWord) => {
          const productTitle = product.title.toLowerCase();
          const productDescription = product.description.toLowerCase();
          return (
            productTitle.includes(queryWord) ||
            productDescription.includes(queryWord)
          );
        });
      });
    }

    if (dateFilter === "newest") {
      filteredProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (dateFilter === "oldest") {
      filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredProducts(filteredProducts);
  }, [searchQuery, products, dateFilter]);

  const handleLetterFilter = (order) => {
    setSearchQuery("");
    let sortedProducts;

    if (order === "asc") {
      sortedProducts = [...products].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else if (order === "desc") {
      sortedProducts = [...products].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    setFilteredProducts(sortedProducts);
  };

  const handlePriceFilter = (option) => {
    let sortedProducts = [...filteredProducts];
    if (option === "asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  useEffect(() => {
    // Call getProfile function to log its output
    getProfile("seller")
      .then((userProfile) => {
        setProfile(userProfile.seller);
      })
      .catch((error) => {
        console.error("Error getting user profile:", error);
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
        </Stack>
        <SearchBar
          onSearch={handleSearch}
          onLetterFilter={handleLetterFilter}
          onPriceFilter={handlePriceFilter}
          onDateFilter={setDateFilter}
          dateFilter={dateFilter}
        />

        <hr />
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
          {products.length > 0 && <Products products={visibleProducts} />}
        </Row>
        <div className="mt-3">
          <nav aria-label="Page navigation ">
            <ul className="pagination">
              <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(activePage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    activePage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  activePage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(activePage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
      <CreateProductModal show={showCreateModal} onHide={closeCreateModal} />
    </>
  );
}
