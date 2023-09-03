import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useAuth } from '../../store/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { isUserAuthenticated, getAuthenticatedUserInfo } = useAuth();

  const isAuthenticated = isUserAuthenticated();
  const getUserInfo = getAuthenticatedUserInfo();

  const navigate = useNavigate();
  const [, setCookie] = useCookies(['accessToken']);

  useEffect(() => {
    // Check if there's an existing access token in local storage
    if (isAuthenticated) {
      const userInfo = getUserInfo();
      console.log('User Role:', userInfo.role);
      if (userInfo.role === 'admin') {
        navigate('/admin/home');
      } else if (userInfo.role === 'customer') {
        navigate('/');
      } else if (userInfo.role === 'seller') {
        navigate('/seller/home');
      }
    }
  }, [isAuthenticated, navigate, getUserInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: password,
        phone: phone,
      });

      // Handle successful login
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setShowModal(true);

      // Save the accessToken to local storage
      setCookie('sb', response.data.accessToken, { path: '/' });
    } catch (error) {
      // Handle login error
      console.log(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'An error occurred');
      } else {
        setErrorMessage('An error occurred');
      }
      setSuccessMessage('');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className='container mt-5'>
        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label
              htmlFor='identifier'
              className='form-label'
            >
              Email or Phone
            </label>
            <input
              type='text'
              className='form-control'
              id='identifier'
              value={email || phone}
              onChange={(e) => {
                if (e.target.value.includes('@')) {
                  setEmail(e.target.value);
                  setPhone('');
                } else {
                  setPhone(e.target.value);
                  setEmail('');
                }
              }}
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
          <button
            type='submit'
            className='btn btn-primary'
          >
            Login
          </button>
        </form>

        {/* Success/Error Modal */}
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
                  {successMessage ? 'Success' : 'Error'}
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
              <div className='modal-body'>{successMessage || errorMessage}</div>
              {successMessage ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
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

export default Login;
