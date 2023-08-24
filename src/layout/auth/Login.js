import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });

      // Handle successful login, e.g., store user data in state or context
      console.log('Login successful:', response.data);
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error('Login error:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <form onSubmit={handleLogin}>
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
    </div>
  );
};

export default Login;
