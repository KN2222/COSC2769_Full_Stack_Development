import { Container, Nav, Navbar } from "react-bootstrap";
import { ArrowRight, PeopleFill, PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const mockAdminId = '123';

export const AdminNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/admin/home">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={`/admin/category`}>
                Category
              </Nav.Link>
              <Nav.Link as={Link} to={`/admin/cv`}>
                Seller CV
              </Nav.Link>
              {/* <Nav.Link href="/#">
                <PersonCircle/>
              </Nav.Link> */}
            </Nav>
            <Nav className="ms-auto">
              {" "}
              {/* This class positions items to the right */}
              <Nav.Link as={Link} to={`/admin/${mockAdminId}`}>
                <PersonCircle />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
