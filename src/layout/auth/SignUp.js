// Login Page
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    formData.append('role', 'user');

    try {
      const response = await axios.post(
        'http://localhost:8000/auth',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle success
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle error
      console.error('Registration error:', error);
    }
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
          <label
            htmlFor='avatar'
            className='form-label'
          >
            Avatar
          </label>
          <input
            type='file'
            className='form-control'
            id='avatar'
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default SignUp;
