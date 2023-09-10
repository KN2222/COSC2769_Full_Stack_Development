import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPageSeller = () => {
  return (
    <div className='container text-center'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='error-template'>
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className='error-details'>
              Sorry, an error occurred. The requested page was not found!
            </div>
            <div className='error-actions'>
              <Link
                to='/seller/status'
                className='btn btn-primary btn-lg mt-3'
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPageSeller;
