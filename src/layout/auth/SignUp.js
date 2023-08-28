import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    console.log(name, email, password, role);
  }, [name, email, password, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      // Handle success
      setModalMessage(response.data.message);
      setIsSuccess(true);
      setShowModal(true);
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        console.log(error.response.data);
        const errorMessageFromBackend = error.response.data.error;
        if (error.response.data.error) {
          // Display individual field validation error
          setModalMessage(Object.values(error.response.data.error));
        } else if (errorMessageFromBackend === 'Email already exists') {
          setModalMessage(
            'Email already exists. Please use a different email.'
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            />
            <label
              className='form-check-label'
              htmlFor='userRole'
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
              checked={role === 'seller'}
              onChange={() => setRole('seller')}
            />
            <label
              className='form-check-label'
              htmlFor='sellerRole'
            >
              Seller
            </label>
          </div>
        </div>
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
              <h5 className='modal-title'>{isSuccess ? 'Success' : 'Error'}</h5>
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
          </div>
        </div>{' '}
      </div>
      <div
        className={`modal-backdrop fade ${showModal ? 'show' : ''}`}
        style={{ display: showModal ? 'block' : 'none' }}
      ></div>
    </div>
  );
};

export default SignUp;
