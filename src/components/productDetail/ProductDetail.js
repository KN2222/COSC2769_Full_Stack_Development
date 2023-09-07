import { NavLink, useParams } from 'react-router-dom';
import { useGetProducts } from '../../api/getProducts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SkeletonProductDetail } from '../loading/SkeletonProductDetail';

export default function ProductDetail() {
  const { productId } = useParams();

  console.log('Product ID:', productId);

  const { data: products, loading } = useGetProducts(productId);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    updateCart(product.id, quantity);
    alert(`Added ${quantity} ${product.title} to the cart.`);
  };

  if (loading) {
    return <SkeletonProductDetail />;
  }

  const product = products[0]; // Since useGetProducts now returns an array

  const updateCart = (productId, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the product in the cart array
    const existingIndex = cart.findIndex((item) => item.id === productId);

    if (existingIndex !== -1) {
      // If the product exists in the cart, update its quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      cart.push({ id: productId.toString(), quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className='container mt-4 w-50'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item '>
            <Link
              to='/'
              style={{ textDecoration: 'none' }}
              onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
              onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
            >
              Home{' '}
            </Link>
          </li>
          <Link
            style={{ textDecoration: 'none' }}
            className='breadcrumb-item active '
            aria-current='page'
            onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
            onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
          >
            {product.category}
          </Link>
        </ol>
      </nav>
      <div className='row mt-5'>
        <div className='col-md-4'>
          <img
            src={product.image}
            alt={product.title}
            className='img-fluid'
          />
        </div>
        <div className='col-md-8 text-center'>
          <h2 className='fw-bold'>{product.title}</h2>
          <div className='w-75 mx-auto '>
            <p className='fs-6 fw-normal'>{product.description}</p>
          </div>
          <p className='fs-6 fw-normal text-primary'>Price: ${product.price}</p>
          <div className='d-flex align-items-center mt-3'>
            <button
              className='btn btn-primary me-3'
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}
            >
              -
            </button>
            <input
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className='form-control text-center'
              min='1'
            />
            <button
              className='btn btn-primary ms-3'
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            className='btn btn-primary mt-3'
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>{' '}
        </div>
      </div>
    </div>
  );
}
