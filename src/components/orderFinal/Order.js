import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { PatchOrderActions } from '../../api/patchOrderActions';

import { APIService } from '../../axios/client';
import { useEffect } from 'react';
import { useCallback } from 'react';

function Order() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { rejectOrder, acceptOrder } = PatchOrderActions();

  const handlleReject = (orderID) => {
    rejectOrder(orderID);
    getOrder();
  };
  const handlleAccept = (orderID) => {
    acceptOrder(orderID);
    getOrder();
  };

  const [orders, setOrders] = useState([]);

  const getOrder = useCallback(async () => {
    try {
      const response = await APIService.get('/customer/order');
      if (response.data && response.data.productOrderOfCustomer) {
        setOrders(response.data.productOrderOfCustomer);
      } else {
        // Handle the case where the response doesn't contain the expected data
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      // Handle errors here, e.g., show an error message to the user
      console.error('Error fetching order:', error);
    }
  }, []);

  useEffect(() => {
    getOrder(); // Call it once when the component mounts
  }, [getOrder]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const ordersToDisplay = isExpanded
    ? [...orders].reverse()
    : [...orders].reverse().slice(0, 6);

  function extractFilenameWithoutExtension(filePath) {
    // Split the string by backslashes (\\) to get an array of path components
    const pathComponents = filePath.split('\\');
    // Get the last component, which contains the filename
    const filenameWithExtension = pathComponents[pathComponents.length - 1];
    // Split the filename by dot (.) to separate the filename and extension
    const [filenameWithoutExtension] = filenameWithExtension.split('.');
    return filenameWithoutExtension;
  }

  return (
    <div
      className='mb-4 p-4 w-75 mx-auto'
      key='unique-key'
    >
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {ordersToDisplay.map((order) => (
          <div
            key={order.id}
            className='col'
          >
            <Card className='h-100'>
              <Link
                style={{ textDecoration: 'none' }}
                to={`/product/${extractFilenameWithoutExtension(order.image)}`}
              >
                <Card.Img
                  variant='top'
                  src={`http://localhost:8000/seller/product/image/${extractFilenameWithoutExtension(
                    order.image
                  )}`}
                  alt={order.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
              </Link>

              <Card.Body className='d-flex flex-column'>
                <div>
                  <Card.Title className='text-truncate fw-bold'>
                    <Link
                      className='text-black'
                      style={{ textDecoration: 'none' }}
                      to={`/product/${extractFilenameWithoutExtension(
                        order.image
                      )}`}
                    ></Link>
                  </Card.Title>
                  <Card.Text className='one-line-truncate'>
                    <span className='fw-semibold text-decoration-underline'>
                      Description:
                    </span>
                    {order.description}
                    <br />
                    <span className='fw-semibold text-decoration-underline'>
                      ID:
                    </span>
                    {order.order}
                  </Card.Text>
                </div>
                <div className=''>
                  <Card.Text className='text-success fw-semibold'>
                    Price: {order.price}$
                  </Card.Text>
                </div>

                {/* no link */}
                <div className='my-3'>
                  <hr style={{ borderColor: '#000' }} />
                </div>
                {/* {order.status !== 'Shipped' && (
                  <Card.Text className='fw-semibold'>
                    Status: {order.status}
                  </Card.Text>
                )} */}
                {order.status === 'Accepted' && (
                  <Card.Text className='fw-semibold'>
                    Status:&nbsp;
                    <span className='text-success'>{order.status}</span>
                  </Card.Text>
                )}
                {order.status === 'Rejected' && (
                  <Card.Text className='fw-semibold text-danger-emphasis'>
                    Status:&nbsp;
                    <span className='text-danger'>{order.status}</span>
                  </Card.Text>
                )}
                {order.status === 'Shipped' && (
                  <div>
                    <Card.Text className='fw-semibold'>
                      Status:&nbsp;
                      <span className='text-warning'>{order.status}</span>
                      <div>
                        <Button
                          variant='success'
                          className='me-2'
                          onClick={() => {
                            handlleAccept(order._id);
                            getOrder();
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant='danger'
                          onClick={() => {
                            handlleReject(order._id);
                            getOrder();
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </Card.Text>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      {orders.length > 6 && (
        <div className='d-flex justify-content-center text-center mt-4 '>
          <Button
            variant=''
            onClick={toggleExpansion}
            className='fw-semibold'
          >
            {isExpanded ? (
              <>
                Show Less <CaretUpFill size={20} />
              </>
            ) : (
              <>
                Show More <CaretDownFill size={20} />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Order;
