import { useAuth } from "../../../store/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { UpdateUserProfileImage } from "../../../api/updateUserProfileImage";
import { ButtonGroup } from "react-bootstrap";

export default function SellerProfile() {
  const { isUserAuthenticated, getProfile } = useAuth();
  const { getUserAvatar, userAvatar } = useAuth();
  const [profile, setProfile] = useState("");

  const isAuthenticated = isUserAuthenticated();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    getProfile("seller")
      .then((userProfile) => {
        setProfile(userProfile.seller);
      })
      .catch((error) => {
        console.error("Error getting user profile:", error);
      });
  }, [getProfile]);

  useEffect(() => {
    getUserAvatar(String(localStorage.getItem("_id").slice(1, -1))); // Use the converted userId
  }, [getUserAvatar]);

  const { selectedImage, handleImageChange, handleImageUpload } =
    UpdateUserProfileImage();

  return (
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
                  <p className="m-b-10 f-w-600">Business name</p>
                  <h6 className="text-muted f-w-400">{profile.businessName}</h6>
                </p>
              </div>

              <div className="px-4 mt-1">
                <p className="fonts d-flex gap-2 justify-content-center">
                  <p className="m-b-10 f-w-600">Status</p>
                  <h6 className="text-muted f-w-400">{profile.status}</h6>
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
  );
}
