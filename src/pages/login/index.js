import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../../store/authContext";
import { Container, Row } from "react-bootstrap";
import { useLogin } from "../../api/login";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const { accessToken, getAuthenticatedUserInfo, isUserAuthenticated } =
    useAuth();
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["accessToken"]);
  const isAuthenticated = isUserAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Login successful");
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
  }, [accessToken, navigate, getAuthenticatedUserInfo, isAuthenticated]);

  const validateInputIsEmail = (input) => {
    const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return emailPattern.test(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const data = await login(requestData);
    if (data.accessToken) {
      setCookie("sb", data.accessToken, { path: "/" });
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center p-0"
        fluid
        style={{
          backgroundImage: `url('/auth-background.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "60vh",
        }}
      >
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
      </Container>
    </>
  );
};

export default Login;
