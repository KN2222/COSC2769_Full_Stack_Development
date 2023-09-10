import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import { Col, Container, Row } from "react-bootstrap";
import { useSignUp } from "../../api/signUp";

const SignUp = () => {
  const { signUp, isSuccess } = useSignUp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    businessName: null,
    address: "",
    role: "customer",
  });

  const navigate = useNavigate();
  const { isUserAuthenticated } = useAuth();

  const isAuthenticated = isUserAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login"); // Redirect to the home page or a different route
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(formData);
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center p-0 flex-md-row
        flex-column-reverse
          
        "
        fluid
        style={{
          backgroundImage: `url('/auth-background.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "90vh",
        }}
      >
        <Row className="col-md-6 col-0">
          <Col
            sm={12}
            className="d-md-flex justify-content-between align-items-center
            d-none"
          >
            <img
              src="/signup-asset.png"
              alt="signup-asset"
              style={{
                width: "80%",
                height: "90%",
              }}
            />
          </Col>
        </Row>

        <Row className="col-lg-5 col-md-6 col-xl-3 col-8 mx-0">
          <Container className="bg-white p-5 rounded-3 shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="customerRole"
                    value="customer"
                    checked={formData.role === "customer"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="customerRole">
                    Customer
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="sellerRole"
                    value="seller"
                    checked={formData.role === "seller"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="sellerRole">
                    Seller
                  </label>
                </div>
              </div>
              {formData.role === "seller" && (
                <div className="mb-3">
                  <label htmlFor="businessName" className="form-label">
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {formData.role === "customer" && (
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
