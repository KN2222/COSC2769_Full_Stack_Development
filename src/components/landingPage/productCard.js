import { GetProducts } from "../../api/mockProducts";
import { useState } from "react";

export default function ProductCard() {
  const products = GetProducts();
  const productsPerPage = 9; // 3x3 grid = 9 products per page
  const totalPages = Math.ceil(products.length / productsPerPage);
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const startIndex = (activePage - 1) * productsPerPage;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="container">
      <h1 className="mt-4">Product Cards</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {visibleProducts.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title text-truncate">{product.title}</h5>
                <p className="card-text h-2">{`${product.description.slice(
                  0,
                  75
                )}...`}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-primary ">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
