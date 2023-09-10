import React, { useState } from "react";
import axios from "axios";
import { UpdateUserProfileImage } from "../../../api/updateUserProfileImage";
import { useAuth } from "../../../store/authContext";
import { useEffect, useRef } from "react";
import { ButtonGroup } from "react-bootstrap";

export const AdminProfile = () => {
  const [file, setFile] = useState();
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:8000/admin/upload", formData)
      .then((res) => {})
      .catch((er) => console.log(er));
  };

  const { selectedImage, handleImageChange, handleImageUpload } =
    UpdateUserProfileImage();

  const { getUserAvatar, userAvatar } = useAuth(); // Use the hook to access context values
  const { isUserAuthenticated, getAuthenticatedUserInfo } = useAuth();
  const isAuthenticated = isUserAuthenticated();
  // Create a ref for the file input element
  const fileInputRef = useRef(null);

  // Function to trigger the click event on the file input
  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const userInfo = getAuthenticatedUserInfo();

  useEffect(() => {
    // Call getUserAvatar when needed, e.g., when the component mounts
    if (isAuthenticated) {
      getUserAvatar(userInfo.id.slice(1, -1)); // Use the converted userId
    }
  }, [getUserAvatar, isAuthenticated]);

  return (
    // <div className='container mt-3'>
    //   <div
    //     className='page-content page-container'
    //     id='page-content'
    //   >
    //     <div className='padding'>
    //       <div className='row container d-flex justify-content-center'>
    //         <div className='col-xl-6 col-md-12'>
    //           <div className='card user-card-full'>
    //             <div className='row m-l-0 m-r-0'>
    //               <div className='col user-profile'>
    //                 <div className='card-block text-center'>
    //                   <h4 className='mt-3'>Upload your avatar here:</h4>
    //                   <div className='m-b-25'>
    //                     {selectedImage ? (
    //                       <img
    //                         id='image-preview'
    //                         alt='ava preview'
    //                         className='rounded-circle img-thumbnail'
    //                         style={{
    //                           overflow: 'hidden',
    //                           height: '240px',
    //                           width: '240px',
    //                           borderRadius: '50%',
    //                         }}
    //                       />
    //                     ) : (
    //                       <img
    //                         src={userAvatar}
    //                         alt='userAvatar'
    //                         className='rounded-circle img-thumbnail'
    //                         style={{
    //                           overflow: 'hidden',
    //                           height: '240px',
    //                           width: '240px',
    //                           borderRadius: '50%',
    //                         }}
    //                       />
    //                     )}
    //                   </div>
    //                   <div className='input-group mt-3'>
    //                     <input
    //                       type='file'
    //                       accept='image/*'
    //                       onChange={handleImageChange}
    //                       className='form-control'
    //                       id='inputGroupFile04'
    //                       aria-describedby='inputGroupFileAddon04'
    //                       aria-label='Upload'
    //                     />
    //                   </div>
    //                   <button
    //                     className='btn btn-primary mt-3 mb-3'
    //                     onClick={handleImageUpload}
    //                   >
    //                     Upload Image
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="card p-3 py-4">
            <div className="text-center">
              {selectedImage ? (
                <img
                  id="image-preview"
                  alt="ava preview"
                  width="100"
                  className="rounded-circle img-thumbnail"
                />
              ) : (
                <img
                  src={userAvatar ? userAvatar : "/default-avatar.jpg"}
                  alt="userAvatar"
                  className="rounded-circle img-thumbnail"
                  width="100"
                />
              )}
            </div>

            <div className="text-center mt-3">
              <div className="buttons">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <ButtonGroup>
                  <button
                    className="btn btn-outline-primary px-4 upload-button"
                    onClick={openFileInput}
                  >
                    Upload Image
                  </button>
                  <button
                    className="btn btn-outline-primary px-4 upload-button"
                    onClick={handleImageUpload}
                  >
                    Save
                  </button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
