import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../store/authContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: null,
    address: '',
    role: 'customer', // Default role is 'user'
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const navigate = useNavigate();
  const { isUserAuthenticated } = useAuth();

  const isAuthenticated = isUserAuthenticated();

  useEffect(() => {
    // Check if there's an existing access token in local storage
    if (isAuthenticated) {
      navigate('/'); // Redirect to the home page or a different route
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/auth/signup',
        formData
      );
      console.log(formData);
      // Handle success
      setModalMessage(response.data.message);
      setIsSuccess(true);
      setShowModal(true);
    } catch (error) {
      // Handle error
      console.log(error);
      if (error.response && error.response.data) {
        console.log(error.response.data);
        const errorMessageFromBackend = error.response.data.error;
        if (error.response.data.error) {
          // Display individual field validation error
          setModalMessage(Object.values(error.response.data.error));
        } else if (
          errorMessageFromBackend === 'Email or Phone already exists'
        ) {
          setModalMessage(
            'Email or Phone already exists. Please use a different email or phone.'
          );
        } else {
          setModalMessage(errorMessageFromBackend || 'An error occurred');
        }
      } else {
        setModalMessage('An error occurred');
      }
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
    setIsSuccess(true);
  };

  return (
    <div>
      <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label
              htmlFor='name'
              className='form-label'
            >
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='email'
              className='form-label'
            >
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='password'
              className='form-label'
            >
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='phone'
              className='form-label'
            >
              Phone
            </label>
            <input
              type='text'
              className='form-control'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Role</label>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='role'
                id='customerRole'
                value='customer'
                checked={formData.role === 'customer'}
                onChange={handleChange}
              />
              <label
                className='form-check-label'
                htmlFor='customerRole'
              >
                Customer
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='role'
                id='sellerRole'
                value='seller'
                checked={formData.role === 'seller'}
                onChange={handleChange}
              />
              <label
                className='form-check-label'
                htmlFor='sellerRole'
              >
                Seller
              </label>
            </div>
          </div>
          {formData.role === 'seller' && (
            <div className='mb-3'>
              <label
                htmlFor='businessName'
                className='form-label'
              >
                Business Name
              </label>
              <input
                type='text'
                className='form-control'
                id='businessName'
                name='businessName'
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {formData.role === 'customer' && (
            <div className='mb-3'>
              <label
                htmlFor='address'
                className='form-label'
              >
                Address
              </label>
              <input
                type='text'
                className='form-control'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button
            type='submit'
            className='btn btn-primary'
          >
            Register
          </button>
        </form>
        <div
          className={`modal fade ${showModal ? 'show' : ''}`}
          style={{ display: showModal ? 'block' : 'none' }}
          tabIndex='-1'
          role='dialog'
        >
          <div
            className='modal-dialog'
            role='document'
          >
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>
                  {isSuccess ? 'Success' : 'Error'}
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={closeModal}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>{modalMessage}</div>
              {isSuccess ? (
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                    onClick={() => navigate('/')}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={`modal-backdrop fade ${showModal ? 'show' : ''}`}
          style={{ display: showModal ? 'block' : 'none' }}
        ></div>
      </div>
    </div>
  );
};

export default SignUp;
