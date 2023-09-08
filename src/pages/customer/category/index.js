import React, { useState } from 'react';
import { GetProductsByCategory } from '../../../api/getProductsByCategory';
import { useParams } from 'react-router-dom';
import { SkeletonProductCard } from '../../../components/loading/SkeletonProductCard';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function Category() {
  const { categoryId } = useParams();
  const { products, loading } = GetProductsByCategory(categoryId);

  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate start and end indices for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  let productsToDisplay = [];
  let totalPages = 0;

  if (products.products && Object.keys(products.products).length !== 0) {
    productsToDisplay = products.products.slice(startIndex, endIndex);
    totalPages = Math.ceil(products.products.length / productsPerPage);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='container'>
      <h2>Product Category</h2>
      <h3>Number of products: {products.count}</h3>
      {loading ? (
        <SkeletonProductCard />
      ) : (
        <>
          {productsToDisplay.length === 0 ? (
            <>No products to display.</>
          ) : (
            <>
              <div className='row row-cols-1 row-cols-md-3 g-4'>
                {productsToDisplay.map((product) => (
                  <div
                    key={product._id}
                    className='col'
                  >
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/product/${product._id}`}
                    >
                      <Card className='h-100 d-flex flex-column justify-content-between'>
                        <Card.Img
                          variant='top'
                          alt={product.title}
                          src={`http://localhost:8000/seller/product/image/${product._id}`}
                          style={{ objectFit: 'cover', height: '200px' }}
                        />
                        <Card.Body className='d-flex flex-column'>
                          <div>
                            <div className='d-flex flex-row '>
                              <Card.Title className='text-truncate'>
                                {product.title}
                              </Card.Title>
                            </div>
                            <Card.Text className='multi-line-truncate'>
                              <span className='fw-semibold text-decoration-underline'>
                                Description:
                              </span>
                              {product.description}
                            </Card.Text>
                          </div>
                          <div className='mt-auto'>
                            <Card.Text className='text-success fw-semibold'>
                              Price: ${product.price}
                            </Card.Text>
                            <Button variant='primary'>Add to Cart</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
              <nav
                aria-label='Page navigation'
                className='mt-3'
              >
                <ul className='pagination'>
                  <li
                    className={`page-item ${
                      currentPage === 1 ? 'disabled' : ''
                    }`}
                  >
                    <button
                      className='page-link'
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? 'active' : ''
                      }`}
                    >
                      <button
                        className='page-link'
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? 'disabled' : ''
                    }`}
                  >
                    <button
                      className='page-link'
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
          {/* Pagination */}
        </>
      )}
    </div>
  );
}

export default Category;
