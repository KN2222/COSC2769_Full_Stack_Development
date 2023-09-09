import { PersonCircle } from 'react-bootstrap-icons';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAuth } from '../../store/authContext';
import { Link, useNavigate } from 'react-router-dom';

export const SellerNavbar = () => {
  const navigate = useNavigate();

  const { Logout } = useAuth();

  const handleLogout = () => {
    const route = Logout();
    // Redirect the user to the specified route
    window.location.href = route;
  };
  return (
    <>
      <Navbar
        expand='lg'
        className='bg-body-tertiary sticky-top'
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to='/'
          >
            App
          </Navbar.Brand>
          <Navbar.Brand
            as={Link}
            to='/seller/home'
          >
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link
                as={Link}
                to={`/seller/order`}
              >
                Order
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/seller/statistic`}
              >
                Statistic
              </Nav.Link>
            </Nav>
            <Nav>
              <DropdownButton
                as={ButtonGroup}
                title='Account'
              >
                <Dropdown.Item
                  href='/seller/profile'
                  onClick={() => {
                    navigate(`/seller/profile`);
                  }}
                >
                  <PersonCircle /> Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
