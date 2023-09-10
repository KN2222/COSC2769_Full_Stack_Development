import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../store/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { Trash3Fill } from 'react-bootstrap-icons';
import { GetProductsByIds } from '../../../api/getProductsByIds';
import { CreateOrder } from '../../../api/createOrder';
import { useGetCategoryById } from '../../../api/getCategoryById';
import React from 'react';

export default function CheckOut() {
  const [cartData, setCartData] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const { isUserAuthenticated } = useAuth();

  const isAuthenticated = isUserAuthenticated();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    // Create a copy of the current cart
    const updatedCart = [...cart];

    // Find the index of the product in the cart
    const productIndex = updatedCart.findIndex(
      (item) => item.product === productId
    );

    if (productIndex !== -1) {
      // Update the quantity of the product
      updatedCart[productIndex].quantity = parseInt(newQuantity);

      // Update the cart state to trigger a re-render
      setCart(updatedCart);

      // Update the cart in local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartFromLocalStorage);
  }, []);

  const { fetchProductsByIds } = GetProductsByIds();

  const handleDelete = (productId) => {
    // Create a copy of the current cart
    const updatedCart = [...cart];

    // Find the index of the product with the matching productId
    const productIndex = updatedCart.findIndex(
      (product) => product.product === productId
    );

    // Check if the product exists in the cart
    if (productIndex !== -1) {
      // Remove the product from the cart
      updatedCart.splice(productIndex, 1);

      // Update the cart state to trigger a re-render
      setCart(updatedCart);

      // Update the cart in local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (cart.length === 0) {
        return; // Exit the function if the cart is empty
      }

      const productsData = await fetchProductsByIds(cart);
      setCartData(productsData);
    };

    fetchProducts(); // Fetch products when the component mounts
  }, [cart, fetchProductsByIds]);

  useEffect(() => {
    const Sum = Object.values(cartData).reduce((sum, item) => {
      const { quantity, price } = item;
      return sum + quantity * price;
    }, 0);
    setTotal(Sum);
  }, [cartData]);

  const { handleCheckout } = CreateOrder();

  const handleCheckoutClick = () => {
    handleCheckout(cartData, isAuthenticated, navigate);
  };

  const { fetchCategoryById } = useGetCategoryById();
  const [productCategoryNames, setProductCategoryNames] = useState({});

  useEffect(() => {
    // Fetch and set the category names for each product in the cart when the component mounts
    if (Object.keys(cartData).length === 0) {
      return;
    }

    const promises = Object.keys(cartData).map((productId) => {
      const product = cartData[productId];
      if (product.categories && product.categories.length > 0) {
        const categoryPromises = product.categories.map((categoryId) =>
          fetchCategoryById(categoryId)
            .then((category) => category.name)
            .catch((error) => {
              console.error('Error fetching category:', error);
              return 'Category Not Found';
            })
        );

        return Promise.all(categoryPromises).then((categoryNames) => ({
          [productId]: categoryNames,
        }));
      } else {
        return { [productId]: ['Category Not Found'] };
      }
    });

    Promise.all(promises)
      .then((results) => {
        // Combine the results into a single object
        const categoryNames = results.reduce((acc, result) => {
          return { ...acc, ...result };
        }, {});
        setProductCategoryNames(categoryNames);
      })
      .catch((error) => {
        console.error('Error fetching category names:', error);
      });
  }, [fetchCategoryById, cartData]);

  return (
    <section className='pt-5 pb-5'>
      <div className='container'>
        <div className='row w-100'>
          <div className='col-lg-12 col-md-12 col-12'>
            <h3 className='display-5 mb-2 text-center'>Shopping Cart</h3>
            <p className='mb-5 text-center'>
              {cart.length ? (
                <>
                  <i className='text-info font-weight-bold'>{cart.length} </i>
                  items in your cart
                </>
              ) : (
                <>You don't have any items in your cart yet</>
              )}
            </p>
            <table
              id='shoppingCart'
              className='table table-condensed table-responsive'
            >
              <thead>
                <tr>
                  <th style={{ width: '60%' }}>Product</th>
                  <th style={{ width: '12%' }}>Price</th>
                  <th style={{ width: '10%' }}>Quantity</th>
                  <th style={{ width: '16%' }}></th>
                </tr>
              </thead>
              <tbody>
                {Object.values(cartData).map((product) => (
                  <tr key={product._id}>
                    <td data-th='Product'>
                      <div className='row'>
                        <div className='col-md-3 text-left'>
                          <img
                            src={`http://localhost:8000/seller/product/image/${product._id}`}
                            alt={product.title}
                            className='img-thumbnail d-none d-md-block rounded mb-2 shadow'
                          />
                        </div>
                        <div className='col-md-9 text-left mt-sm-2'>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/product/${product._id}`}
                          >
                            <h4>{product.title}</h4>
                          </Link>
                          <div className='font-weight-light'>
                            Description: {product.description}
                            <br />
                            Color: {product.Color}
                            <br />
                            Size: {product.Size}
                            <br />
                            <div>
                              Category:&nbsp;
                              {productCategoryNames[product.id] ? (
                                <>
                                  {Object.values(
                                    productCategoryNames[product.id]
                                  ).map((category, index, categoriesArray) => (
                                    <React.Fragment key={category}>
                                      <Link
                                        to={`/category/${product.categories[index]}`}
                                        style={{ textDecoration: 'none' }}
                                      >
                                        {category}
                                        {index < categoriesArray.length - 1 &&
                                          ', '}
                                      </Link>
                                    </React.Fragment>
                                  ))}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td data-th='Price'>${product.price}</td>
                    <td data-th='Quantity'>
                      <input
                        type='number'
                        className='form-control form-control-lg text-center'
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(product.id, e.target.value)
                        }
                        placeholder={product.quantity}
                      />
                    </td>
                    <td
                      className='actions'
                      data-th=''
                    >
                      <div className='text-right'>
                        <Button
                          variant='outline-danger'
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash3Fill />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Container>
              <Row>
                <Col sm={8}></Col>
                <Col sm={4}>
                  <div className='float-right text-right'>
                    <h4>Subtotal:</h4>
                    <h1>${total}</h1>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className='mx-auto'>
          <Container>
            <Row>
              <Col sm={8}>
                <div className='col-sm-6 mb-3 mb-m-1 order-md-1 text-md-left'>
                  <Link to='/'>
                    <i className='fas fa-arrow-left mr-2'></i> Continue Shopping
                  </Link>
                </div>
              </Col>
              <Col sm={4}>
                <div className='col-sm-6 order-md-2 text-right'>
                  <Button
                    variant='primary'
                    onClick={handleCheckoutClick} // Call the checkout function
                    className='mb-4 btn-lg pl-5 pr-5'
                  >
                    Checkout
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
}
