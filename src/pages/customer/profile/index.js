import { useAuth } from '../../../store/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UpdateUserProfileImage } from '../../../api/updateUserProfileImage';

export default function CustomerProfile() {
  const { isUserAuthenticated, getProfile, getAuthenticatedUserInfo } =
    useAuth();
  const userInfo = getAuthenticatedUserInfo();

  const { getUserAvatar, userAvatar } = useAuth(); // Use the hook to access context values
  const [profile, setProfile] = useState('');

  const isAuthenticated = isUserAuthenticated();
  const navigate = useNavigate();

  const { selectedImage, handleImageChange, handleImageUpload } =
    UpdateUserProfileImage();

  useEffect(() => {
    // Check if there's an existing access token in local storage
    if (!isAuthenticated) {
      navigate('/'); // Redirect to the home page or a different route
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Call getCustomerProfile function to log its output
    getProfile('customer')
      .then((userProfile) => {
        setProfile(userProfile.customer);
      })
      .catch((error) => {
        console.error('Error getting user profile:', error);
      });
  }, [getProfile]);

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
                      <h6 className='f-w-600'>{profile.name}</h6>

                      {/* {userInfo ?? (
                        <p className='text-capitalize'>
                          {String(userInfo.role.slice(1, -1))}
                        </p>
                      )} */}
                      <div className='input-group'>
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
                        className='btn btn-primary mt-2'
                        onClick={handleImageUpload}
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                  <div className='col'>
                    <div className='card-block'>
                      <h6 className='m-b-20 p-b-5 b-b-default f-w-600'>
                        Information
                      </h6>
                      <div className=''>
                        <div className='col-sm-6'>
                          <p className='m-b-10 f-w-600'>Email</p>
                          <h6 className='text-muted f-w-400'>
                            {profile.email}
                          </h6>
                        </div>
                        <div className='col-sm-6'>
                          <p className='m-b-10 f-w-600'>Phone</p>
                          <h6 className='text-muted f-w-400'>
                            {profile.phone}
                          </h6>
                        </div>
                        <div className='col-sm-6'>
                          <p className='m-b-10 f-w-600'>Address</p>
                          <h6 className='text-muted f-w-400'>
                            {profile.address}
                          </h6>
                        </div>
                      </div>
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
}
