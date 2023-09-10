import { useState, useEffect } from "react";
import { useGetProducts } from "../../api/getProducts";
import { Link } from "react-router-dom";
import { SkeletonProductCard } from "../loading/SkeletonProductCard";
import { Card, Button, Col, Row, Container, Stack } from "react-bootstrap";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import { SaleBanner } from "../banner/SaleBanner";

export default function ProductCard() {
  const { data: products, loading } = useGetProducts();
  const productsPerPage = 18;
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

  return (
    <Stack gap={2}>
      <SearchBar
        onSearch={handleSearch}
        onLetterFilter={handleLetterFilter}
        onPriceFilter={handlePriceFilter}
        onDateFilter={setDateFilter}
        dateFilter={dateFilter}
      />

      <SaleBanner/>

      {loading ? (
        <SkeletonProductCard />
      ) : (
        <Row className="row-cols-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6 g-3">
          {visibleProducts.length === 0 ? (
            <p className="text-center mt-5 mx-auto fw-semibold text-danger">
              Sorry for the inconvenience, the products you are looking for are
              now out of stock!
            </p>
          ) : (
            visibleProducts.map((product) => (
              <Col
                key={product._id}
                // className='col'
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/product/${product._id}`}
                >
                  <Card className="h-100 d-flex flex-column justify-content-between">
                    <Card.Img
                      variant="top"
                      alt={product.title}
                      src={`http://localhost:8000/seller/product/image/${product._id}`}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div>
                        <div className="d-flex flex-row ">
                          <Card.Title className="text-truncate">
                            {product.title}
                          </Card.Title>
                        </div>
                        <Card.Text className="multi-line-truncate">
                          <span className="fw-semibold text-decoration-underline">
                            {" "}
                            Description:
                          </span>{" "}
                          {product.description}
                        </Card.Text>
                      </div>
                      <div className="mt-auto">
                        <Card.Text className="text-success fw-semibold">
                          Price: ${product.price}
                        </Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))
          )}
        </Row>
      )}
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
    </Stack>
  );
}
