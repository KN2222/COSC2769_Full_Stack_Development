import { Container, Nav, Navbar } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export const SellerNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/seller/home">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`/seller/order`}>
                Order
              </Nav.Link>
              <Nav.Link as={Link} to={`/seller/statistic`}>
                Statistic
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {" "}
              <Nav.Link as={Link} to={`/seller/profile`}>
                <PersonCircle />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
