import { useAuth } from "../../../store/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { UpdateUserProfileImage } from "../../../api/updateUserProfileImage";
import { ButtonGroup } from "react-bootstrap";

export default function CustomerProfile() {
  const { isUserAuthenticated, getProfile, getAuthenticatedUserInfo } =
    useAuth();
  const userInfo = getAuthenticatedUserInfo();

  // Create a ref for the file input element
  const fileInputRef = useRef(null);

  // Function to trigger the click event on the file input
  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const { getUserAvatar, userAvatar } = useAuth(); // Use the hook to access context values
  const [profile, setProfile] = useState("");

  const isAuthenticated = isUserAuthenticated();
  const navigate = useNavigate();

  const { selectedImage, handleImageChange, handleImageUpload } =
    UpdateUserProfileImage();

  useEffect(() => {
    // Check if there's an existing access token in local storage
    if (!isAuthenticated) {
      navigate("/"); // Redirect to the home page or a different route
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Call getCustomerProfile function to log its output
    getProfile("customer")
      .then((userProfile) => {
        setProfile(userProfile.customer);
      })
      .catch((error) => {
        console.error("Error getting user profile:", error);
      });
  }, [getProfile]);

  useEffect(() => {
    // Call getUserAvatar when needed, e.g., when the component mounts
    if (isAuthenticated) {
      getUserAvatar(userInfo.id.slice(1, -1)); // Use the converted userId
    }
  }, [getUserAvatar, isAuthenticated]);

  return (
    <>
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
                <span className="bg-secondary p-1 px-4 rounded text-white">
                  {profile.email}
                </span>
                <h5 className="mt-2 mb-0">{profile.name}</h5>
                <span>{profile.phone}</span>

                <div className="px-4 mt-1">
                  <p className="fonts d-flex gap-2 justify-content-center">
                    <p className="m-b-10 f-w-600">Address</p>
                    <h6 className="text-muted f-w-400">{profile.address}</h6>
                  </p>
                </div>
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
    </>
  );
}
