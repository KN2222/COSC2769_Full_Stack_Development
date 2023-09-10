import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAuth } from "../../store/authContext";
import { Col, Container, Row } from "react-bootstrap";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { accessToken, getAuthenticatedUserInfo, isUserAuthenticated } =
    useAuth(); // Use the accessToken from AuthContext
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);
  const isAuthenticated = isUserAuthenticated();

  function LoginSuccessfull() {
    const userInfo = getAuthenticatedUserInfo();
    const userRole = userInfo.role.slice(1, -1);
    if (userRole === "customer") {
      navigate("/");
    } else if (userRole === "seller") {
      navigate("/seller/home");
    } else if (userRole === "admin") {
      navigate("/admin/home");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const userInfo = getAuthenticatedUserInfo();
      const userRole = userInfo.role.slice(1, -1);

      if (userRole === "customer") {
        navigate("/");
      } else if (userRole === "seller") {
        navigate("/seller/home");
      } else if (userRole === "admin") {
        navigate("/admin/home");
      }
    }
    // }
  }, [accessToken, navigate, getAuthenticatedUserInfo, isAuthenticated]);

  const validateInputIsEmail = (input) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    return emailPattern.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isEmail = validateInputIsEmail(emailOrPhone);

      const requestData = isEmail
        ? {
            phone: "",
            email: emailOrPhone,
            password: password,
          }
        : {
            phone: emailOrPhone,
            email: "",
            password: password,
          };

      const response = await axios.post(
        "http://localhost:8000/auth/login",
        requestData
      );

      // Handle successful login
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setShowModal(true);

      // Save the accessToken to local storage
      setCookie("sb", response.data.accessToken, { path: "/" });
    } catch (error) {
      // Handle login error
      console.log(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "An error occurred");
      } else {
        setErrorMessage("An error occurred");
      }
      setSuccessMessage("");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center p-0" fluid style={{
        backgroundImage: `url('/auth-background.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        height: "60vh",
      }} >
        {/* Login Form */}
        <Row className="col-lg-5 col-md-6 col-xl-3 col-8 mx-0">
          <Container className="bg-white p-5 rounded-3 shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="emailOrPhone" className="form-label">
                  Email or Phone
                </label>
                <input
                  type=""
                  className="form-control"
                  id="emailOrPhone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  placeholder="Email or Phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </Container>
        </Row>

        {/* Success/Error Modal */}
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {successMessage ? "Success" : "Error"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{successMessage || errorMessage}</div>
              {successMessage ? (
                <>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => LoginSuccessfull()}
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
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
          className={`modal-backdrop fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
        ></div>
      </Container>
    </>
  );
};

export default Login;
