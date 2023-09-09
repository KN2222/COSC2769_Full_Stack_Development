import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { UpdateUserProfileImage } from '../../../api/updateUserProfileImage';
import { useAuth } from '../../../store/authContext';
import { useEffect } from 'react';

export const AdminProfile = () => {
  const [file, setFile] = useState();
  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post('http://localhost:8000/admin/upload', formData)
      .then((res) => {})
      .catch((er) => console.log(er));
  };

  const { selectedImage, handleImageChange, handleImageUpload } =
    UpdateUserProfileImage();

  const { getUserAvatar, userAvatar } = useAuth(); // Use the hook to access context values
  const { isUserAuthenticated, getAuthenticatedUserInfo } = useAuth();
  const isAuthenticated = isUserAuthenticated();

  const userInfo = getAuthenticatedUserInfo();

  useEffect(() => {
    // Call getUserAvatar when needed, e.g., when the component mounts
    if (isAuthenticated) {
      getUserAvatar(userInfo.id.slice(1, -1)); // Use the converted userId
    }
  }, [getUserAvatar, isAuthenticated]);

  return (
    <div className='container mt-3'>
      <div
        className='page-content page-container'
        id='page-content'
      >
        <div className='padding'>
          <div className='row container d-flex justify-content-center'>
            <div className='col-xl-6 col-md-12'>
              <div className='card user-card-full'>
                <div className='row m-l-0 m-r-0'>
                  <div className='col user-profile'>
                    <div className='card-block text-center'>
                      <h4 className='mt-3'>Upload your avatar here:</h4>
                      <div className='m-b-25'>
                        {selectedImage ? (
                          <img
                            id='image-preview'
                            alt='ava preview'
                            className='rounded-circle img-thumbnail'
                            style={{
                              overflow: 'hidden',
                              height: '240px',
                              width: '240px',
                              borderRadius: '50%',
                            }}
                          />
                        ) : (
                          <img
                            src={userAvatar}
                            alt='userAvatar'
                            className='rounded-circle img-thumbnail'
                            style={{
                              overflow: 'hidden',
                              height: '240px',
                              width: '240px',
                              borderRadius: '50%',
                            }}
                          />
                        )}
                      </div>
                      <div className='input-group mt-3'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleImageChange}
                          className='form-control'
                          id='inputGroupFile04'
                          aria-describedby='inputGroupFileAddon04'
                          aria-label='Upload'
                        />
                      </div>
                      <button
                        className='btn btn-primary mt-3 mb-3'
                        onClick={handleImageUpload}
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
