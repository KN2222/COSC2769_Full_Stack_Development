import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { PatchOrderActions } from '../../api/patchOrderActions';

function Order({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { rejectOrder, acceptOrder } = PatchOrderActions();

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const ordersToDisplay = isExpanded ? order : order.slice(0, 2);

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
    <div className='mb-4 p-4 w-75 mx-auto'>
      <div className='row row-cols-1 row-cols-md-2 g-4'>
        {ordersToDisplay.reverse().map((order) => (
          <div
            key={order.id}
            className='col'
          >
            <Link
              style={{ textDecoration: 'none' }}
              to={`/product/${extractFilenameWithoutExtension(order.image)}`}
            >
              <Card className='h-100'>
                <Card.Img
                  variant='top'
                  src={`http://localhost:8000/seller/product/image/${extractFilenameWithoutExtension(
                    order.image
                  )}`}
                  alt={order.title}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <Card.Body className='d-flex flex-column'>
                  <div>
                    <Card.Title className='text-truncate fw-bold'>
                      {order.title}
                    </Card.Title>
                    <Card.Text className='one-line-truncate'>
                      <span className='fw-semibold text-decoration-underline'>
                        Description:
                      </span>
                      {order.description}
                    </Card.Text>
                  </div>
                  <div className=''>
                    <Card.Text className='text-success fw-semibold'>
                      Price: {order.price}$
                    </Card.Text>

                    <div className='my-3'>
                      <hr style={{ borderColor: '#000' }} />
                    </div>
                    {order.status !== 'Shipped' && (
                      <Card.Text className='fw-semibold'>
                        Status: {order.status}
                      </Card.Text>
                    )}
                    {order.status === 'Shipped' && (
                      <div className='d-flex flex-row justify-content-between'>
                        <Card.Text className='fw-semibold'>
                          Status: {order.status}
                        </Card.Text>
                        <div>
                          <Button
                            variant='success'
                            className='me-2'
                            onClick={() => acceptOrder(order._id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant='danger'
                            onClick={() => rejectOrder(order._id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>
      {order.length > 2 && (
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
