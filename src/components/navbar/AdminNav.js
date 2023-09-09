import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAuth } from '../../store/authContext';
import { useNavigate } from 'react-router-dom';

export const AdminNavbar = () => {
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
            to='/admin/home'
          >
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link
                as={Link}
                to={`/admin/category`}
              >
                Category
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/admin/seller`}
              >
                Seller CV
              </Nav.Link>
            </Nav>
            {/* <Nav className='ms-auto'>
              {' '}
              <Nav.Link
                as={Link}
                to={`/admin/profile`}
              >
                <PersonCircle />
              </Nav.Link>
            </Nav> */}
            <Nav>
              <DropdownButton
                as={ButtonGroup}
                title='Admin'
              >
                <Dropdown.Item
                  href='/admin/profile'
                  onClick={() => {
                    navigate(`/admin/profile`);
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
