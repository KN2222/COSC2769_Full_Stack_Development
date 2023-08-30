import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useAuth } from '../../store/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { isUserAuthenticated } = useAuth();

  const isAuthenticated = isUserAuthenticated();

  const navigate = useNavigate();
  const [, setCookie] = useCookies(['accessToken']);

  useEffect(() => {
    // Check if there's an existing access token in local storage
    if (isAuthenticated) {
      navigate('/'); // Redirect to the home page or a different route
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: password,
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
