import { useAuth } from '../../../store/authContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APIService } from '../../../axios/client';

export default function Profile() {
  const { isUserAuthenticated, getCustomerProfile } = useAuth();
  const { getUserAvatar, userAvatar } = useAuth(); // Use the hook to access context values
  const [profile, setProfile] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const isAuthenticated = isUserAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an existing access token in local storage
    if (!isAuthenticated) {
      navigate('/'); // Redirect to the home page or a different route
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Call getCustomerProfile function to log its output
    getCustomerProfile()
      .then((userProfile) => {
        const role = String(localStorage.getItem('role').slice(1, -1));

        if (role === 'customer') {
          setProfile(userProfile.customer);
        } else if (role === 'admin') {
          setProfile(userProfile.admin);
        } else if (role === 'seller') {
          setProfile(userProfile.seller);
        }
      })
      .catch((error) => {
        console.error('Error getting user profile:', error);
      });
  }, [getCustomerProfile]);

  useEffect(() => {
    // Call getUserAvatar when needed, e.g., when the component mounts
    getUserAvatar(String(localStorage.getItem('_id').slice(1, -1))); // Use the converted userId
  }, [getUserAvatar]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // Display the selected image as a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      console.error('No image selected.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await APIService.post('/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Use 'multipart/form-data' for file uploads
        },
      });

      if (response.status === 200) {
        console.log('Image uploaded successfully.');
        // You may want to refresh the user's avatar or take other actions
      } else {
        console.error('Failed to upload image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
                          />
                        ) : (
                          <img
                            src={userAvatar}
                            alt='userAvatar'
                            className='rounded-circle img-thumbnail'
                          />
                        )}
                      </div>
                      <h6 className='f-w-600'>{profile.name}</h6>
                      <p>{String(localStorage.getItem('_id').slice(1, -1))}</p>
                      <div class='input-group'>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={handleImageChange}
                          class='form-control'
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
