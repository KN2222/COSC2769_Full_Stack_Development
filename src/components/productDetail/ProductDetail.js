import { useParams } from 'react-router-dom';
import { useGetProducts } from '../../api/getProducts';
import { Link } from 'react-router-dom';
import { SkeletonProductDetail } from '../loading/SkeletonProductDetail';
import { useToastContext } from '../../store/toastContext';
import { useGetCategoryById } from '../../api/getCategoryById';
import { useEffect, useState } from 'react';
import React from 'react';
import PutCart from '../../api/putCart';

export default function ProductDetail() {
  const { fetchCategoryById } = useGetCategoryById();

  const [categories, setCategories] = useState([]);

  const { productId } = useParams();

  const { data: products, loading } = useGetProducts(productId);

  const [quantity, setQuantity] = useState(1);

  const { showToast } = useToastContext();

  const { updateCustomerCart } = PutCart();

  const handleAddToCart = () => {
    updateCart(productId, quantity);
    showToast(200, `Added ${quantity} ${product.title} to the cart.`);
  };

  let product = null;

  if (!loading && products.length > 0) {
    product = products[0];
  }

  useEffect(() => {
    // Ensure that product.categories is defined and has at least one category ID
    if (product && product.categories && product.categories.length > 0) {
      async function fetchCategoriesData() {
        try {
          const categoryData = await Promise.all(
            product.categories.map(async (categoryId) => {
              const category = await fetchCategoryById(categoryId);
              return category.name;
            })
          );
          setCategories(categoryData);
        } catch (error) {
          console.error('Error fetching category names:', error);
        }
      }

      fetchCategoriesData();
    }
  }, [product, fetchCategoryById]);

  const updateCart = (productId, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the index of the product in the cart array
    const existingIndex = cart.findIndex((item) => item.id === productId);

    if (existingIndex !== -1) {
      // If the product exists in the cart, update its quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // If the product doesn't exist in the cart, add it as a new item
      cart.push({ product: productId.toString(), quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCustomerCart(cart);
  };

  const filteredAttributes = [
    'title',
    'description',
    'price',
    'stock',
    'categories',
    '_id',
    'image',
    'seller',
    'date',
    '__v',
  ];

  return (
    <div className='container mt-4 w-50'>
      {loading ? (
        <>
          <SkeletonProductDetail />
        </>
      ) : product ? (
        <>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item '>
                <Link
                  to='/'
                  style={{ textDecoration: 'none' }}
                  onMouseOver={(e) =>
                    (e.target.style.textDecoration = 'underline')
                  }
                  onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                >
                  Home
                </Link>
              </li>
              <Link
                style={{ textDecoration: 'none' }}
                className='breadcrumb-item active '
                aria-current='page'
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = 'underline')
                }
                onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
              >
              </Link>
            </ol>
          </nav>
          <div className='row mt-5'>
            <div className='col-md-4'>
              <img
                src={`http://localhost:8000/seller/product/image/${productId}`}
                alt={product.title}
                className='img-fluid'
              />
            </div>
            <div className='col-md-8 text-center'>
              <h2 className='fw-bold'>{product.title}</h2>
              <div className='w-75 mx-auto text-left'>
                <p className='fs-6 fw-normal'>
                  Description: {product.description}
                </p>
                {/* <p className='fs-6 fw-normal'>Color: {product.Color}</p>
                <p className='fs-6 fw-normal'>Size: {product.Size}</p> */}
                {Object.keys(product)
              .filter((attribute) => !filteredAttributes.includes(attribute))
              .map((attribute) => (
                <p key={attribute}>
                  {attribute}: {product[attribute]}
                </p>
              ))}

                <p className='fs-6 fw-normal'>
                  Category:&nbsp;
                  {categories ? (
                    <>
                      {Object.values(categories).map(
                        (category, index, categoriesArray) => (
                          <React.Fragment key={category}>
                            <Link
                              to={`/category/${product.categories[index]}`}
                              style={{ textDecoration: 'none' }}
                            >
                              {category}
                              {index < categoriesArray.length - 1 && ', '}
                            </Link>
                          </React.Fragment>
                        )
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </p>
              </div>
              <p className='fs-6 fw-normal text-primary'>
                Price: ${product.price}
              </p>
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
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className='text-center'>Product not found</div>
      )}
    </div>
  );
}
