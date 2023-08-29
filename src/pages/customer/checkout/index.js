import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { APIService } from '../../../axios/client';
// import { useGetProducts } from '../../../api/getProducts';
import { useState, useEffect } from 'react';

export default function CheckOut() {
  const [cartData, setCartData] = useState([]);
  const [cart, setCart] = useState('');

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || {});
  }, []);

  console.log('cart', cart);

  const fetchProductsByIds = async (products) => {
    const productsData = {};

    for (const product of products) {
      const { id, quantity } = product;

      try {
        const response = await APIService.get(
          `https://fakestoreapi.com/products/${id}`
        );
        const fetchedProduct = response.data;
        productsData[id] = { id, quantity, ...fetchedProduct };
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
    return productsData;
  };

  useEffect(() => {
    fetchProductsByIds(cart).then((productsData) => {
      setCartData(productsData);
    });
  }, [cart]);

  return (
    <section className='pt-5 pb-5'>
      <div className='container'>
        <div className='row w-100'>
          <div className='col-lg-12 col-md-12 col-12'>
            <h3 className='display-5 mb-2 text-center'>Shopping Cart</h3>
            <p className='mb-5 text-center'>
              <i className='text-info font-weight-bold'>3</i> items in your cart
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
                            src={product.image}
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
                        disabled
                      />
                    </td>
                    <td
                      className='actions'
                      data-th=''
                    >
                      <div className='text-right'>
                        <Button variant='outline-danger'>
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
                    <h1>$99.00</h1>
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
                  <a
                    href='catalog.html'
                    className='btn btn-primary mb-4 btn-lg pl-5 pr-5'
                  >
                    Checkout
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
}