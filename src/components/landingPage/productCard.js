import { useState } from 'react';
import { useGetProducts } from '../../api/getProducts';
import { Link } from 'react-router-dom';
import { SkeletonProductCard } from '../loading/SkeletonProductCard';
import { Card, Button } from 'react-bootstrap';

export default function ProductCard() {
  const { data: products, loading } = useGetProducts();
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
    <div className='container'>
      <h1 className='mt-4'>Product Cards</h1>
      {loading ? (
        <SkeletonProductCard /> // Show skeleton loading component if loading is true
      ) : (
        <div className='row row-cols-1 row-cols-md-3 g-4'>
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className='col'
            >
              <Link
                style={{ textDecoration: 'none' }}
                to={`/product/${product.id}`}
              >
                <Card className='h-100'>
                  <Card.Img
                    variant='top'
                    src={product.image}
                    alt={product.title}
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <Card.Body>
                    <Card.Title className='text-truncate'>
                      {product.title}
                    </Card.Title>
                    <div className='multi-line-truncate'>
                      <Card.Text>{product.description}</Card.Text>
                    </div>
                    <Card.Text>Price: ${product.price}</Card.Text>
                    <Button variant='primary'>Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className='mt-3'>
        <nav aria-label='Page navigation '>
          <ul className='pagination'>
            <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
              <button
                className='page-link'
                onClick={() => handlePageChange(activePage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  activePage === index + 1 ? 'active' : ''
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
                activePage === totalPages ? 'disabled' : ''
              }`}
            >
              <button
                className='page-link'
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
