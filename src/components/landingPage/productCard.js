import { useState, useEffect } from "react";
import { useGetProducts } from "../../api/getProducts";
import { Link } from "react-router-dom";
import { SkeletonProductCard } from "../loading/SkeletonProductCard";
import { Card, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

export default function ProductCard() {
  const { data: products, loading } = useGetProducts();
  const productsPerPage = 9;

  const [activePage, setActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLetter, setFilterLetter] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const startIndex = (activePage - 1) * productsPerPage;

  const handleSearch = (query) => {
    setFilterLetter(null); // Clear the filter letter when using search
    setSearchQuery(query);
  };

  const handleLetterFilter = (letter) => {
    setSearchQuery(""); // Clear the search query when using filter by letter
    setFilterLetter(letter);
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
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

    setFilteredProducts(filteredProducts);
  }, [searchQuery, products]);

  const filteredByLetter = filterLetter
    ? filteredProducts.filter((product) =>
        product.title.toLowerCase().startsWith(filterLetter.toLowerCase())
      )
    : filteredProducts;

  const totalPages = Math.ceil(filteredByLetter.length / productsPerPage);
  const visibleProducts = filteredByLetter.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="container">
      <h1 className="mt-4">Product Cards</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterBar onSelect={handleLetterFilter} />
      {loading ? (
        <SkeletonProductCard /> // Show skeleton loading component if loading is true
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {visibleProducts.length === 0 ? (
            <p className="text-center mt-5 mx-auto fw-semibold text-danger">
              Sorry for the inconvenience, the products you are looking for are now out of stock!
            </p>
          ) : (
            visibleProducts.map((product) => (
              <div key={product.id} className="col">
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/product/${product.id}`}
                >
                  <Card className="h-100 d-flex flex-column justify-content-between">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.title}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <div>
                        <Card.Title className="text-truncate">
                          {product.title}
                        </Card.Title>
                        <Card.Text className="multi-line-truncate">
                          {product.description}
                        </Card.Text>
                      </div>
                      <div className="mt-auto">
                        <Card.Text>Price: ${product.price}</Card.Text>
                        <Button variant="primary">Add to Cart</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))
          )}
        </div>
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
    </div>
  );
}
