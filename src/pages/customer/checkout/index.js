import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { APIService } from '../../../axios/client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../store/authContext';
import { useNavigate } from 'react-router-dom';

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
    const productIndex = updatedCart.findIndex((item) => item.id === productId);

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
    setCart(JSON.parse(localStorage.getItem('cart')) || {});
  }, []);

  const fetchProductsByIds = async (products) => {
    const productsData = {};

    for (const product of products) {
      const { id, quantity } = product;
      try {
        const response = await APIService.get(`/seller/product/${id}`);
        const fetchedProduct = response.data.product; // Access the 'product' object in the response

        productsData[id] = { id, quantity, ...fetchedProduct };
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
    return productsData;
  };

  const handleDelete = (productId) => {
    // Create a copy of the current cart
    const updatedCart = [...cart];

    // Find the index of the product with the matching productId
    const productIndex = updatedCart.findIndex(
      (product) => product.id === productId
    );

    // Check if the product exists in the cart
    if (productIndex !== -1) {
      // Remove the product from the cart
      updatedCart.splice(productIndex, 1);

      // Update the cart state to trigger a re-render
      setCart(updatedCart);

      // Update the cart in local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await fetchProductsByIds(cart);
      setCartData(productsData);
    };

    fetchProducts(); // Fetch products when the component mounts
  }, [cart]);

  useEffect(() => {
    const Sum = Object.values(cartData).reduce((sum, item) => {
      const { quantity, price } = item;
      return sum + quantity * price;
    }, 0);
    setTotal(Sum);
  }, [cartData]);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Please Login first to place order');
      navigate('/login');
    } else {
      try {
        // Prepare the productOrders array
        const productOrders = Object.values(cartData).map((product) => ({
          productId: product.id,
          quantity: product.quantity || 0,
          price: product.price,
        }));

        // Create the request body with the correct property name
        const requestBody = {
          productOrders: productOrders, // Use "productOrders" here
        };

        // Convert the requestBody to a JSON string
        const requestBodyJSON = JSON.stringify(requestBody);

        // Send a POST request to the checkout endpoint using APIService
        const response = await APIService.post(
          '/customer/checkout',
          requestBodyJSON,
          {
            headers: {
              'Content-Type': 'application/json', // Set the Content-Type header
            },
          }
        );

        // Handle success
        console.log('Checkout response:', response.data);
        if (response.data.message === 'Create order successfully') {
          // Clear the 'cart' item from local storage
          localStorage.removeItem('cart');

          // Reload the page
          window.location.reload();
        }

        // You can add further handling or navigation logic here
      } catch (error) {
        // Handle error
        console.error('Error during checkout:', error);
        // You can display an error message or perform other error handling here
      }
    }
  };

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
                <>You don't have any item in your cart yet</>
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
                  <tr key={product.id}>
                    <td data-th='Product'>
                      <div className='row'>
                        <div className='col-md-3 text-left'>
                          <img
                            src={`http://localhost:8000/seller/product/image/${product.id}`}
                            alt={product.title}
                            className='img-thumbnail d-none d-md-block rounded mb-2 shadow'
                          />
                        </div>
                        <div className='col-md-9 text-left mt-sm-2'>
                          <h4>{product.title}</h4>
                          <p className='font-weight-light'>
                            {product.category}
                          </p>
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
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            fill='currentColor'
                            className='bi bi-trash3-fill'
                            viewBox='0 0 16 16'
                          ></svg>
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
                  <a href='/'>
                    <i className='fas fa-arrow-left mr-2'></i> Continue Shopping
                  </a>
                </div>
              </Col>
              <Col sm={4}>
                <div className='col-sm-6 order-md-2 text-right'>
                  <Button
                    variant='primary'
                    onClick={handleCheckout} // Call the checkout function
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
