import { Link, useNavigate } from 'react-router-dom';
import { useCategoryTree } from '../../api/getCategoryTree';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  CartFill,
  PersonCircle,
  Truck,
  BoxArrowLeft,
} from 'react-bootstrap-icons';

import { useState } from 'react';
import { useAuth } from '../../store/authContext';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const HomeNav = () => {
  const { categoryTree } = useCategoryTree();
  const [dropdownMainOpen, setDropdownMainOpen] = useState({});
  const [dropdownSubOpen, setDropdownSubOpen] = useState({});
  const navigate = useNavigate();

  const handleMouseMainEnter = (categoryId) => {
    setDropdownMainOpen((prevState) => ({
      ...prevState,
      [categoryId]: true,
    }));
  };

  const handleMouseMainLeave = (categoryId) => {
    setDropdownMainOpen((prevState) => ({
      ...prevState,
      [categoryId]: false,
    }));
  };

  const handleMouseSubEnter = (categoryId) => {
    setDropdownSubOpen((prevState) => ({
      ...prevState,
      [categoryId]: true,
    }));
  };

  const handleMouseSubLeave = (categoryId) => {
    setDropdownSubOpen((prevState) => ({
      ...prevState,
      [categoryId]: false,
    }));
  };

  const { isUserAuthenticated, Logout } = useAuth();
  const isAuthenticated = isUserAuthenticated();

  const handleLogout = () => {
    const route = Logout();
    // Redirect the user to the specified route
    window.location.href = route;
  };
  const renderSubcategories = (subCategories) => {
    return Object.entries(subCategories).map(([categoryName, category]) => {
      return !isObjectEmpty(category.subCategories) ? (
        <NavDropdown
          id='basic-nav-dropdown'
          key={category._id}
          title={categoryName}
          className='p-0'
          show={dropdownSubOpen[category._id]}
          onMouseEnter={() => handleMouseSubEnter(category._id)}
          onMouseLeave={() => handleMouseSubLeave(category._id)}
          autoClose={'outside'}
          drop='end'
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/category/${category._id}`);
          }}
        >
          {renderSubcategories(category.subCategories)}
        </NavDropdown>
      ) : (
        <NavDropdown.Item
          key={category._id}
          eventKey={2}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/category/${category._id}`);
          }}
        >
          {categoryName}
        </NavDropdown.Item>
      );
    });
  };

  if (!categoryTree) return null;

  return (
    <>
      <Navbar
        key={'navasd'}
        expand='lg'
        className='bg-body-tertiary m-0 pb-0 sticky-top justify-content-between'
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to='/'
          >
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav
              style={{ maxHeight: '100px' }}
              className='me-auto'
            >
              {Object.entries(categoryTree).map(
                ([categoryName, category], index) => {
                  return (
                    <>
                      {isObjectEmpty(category.subCategories) ? (
                        <Nav.Link
                          key={categoryName + index}
                          as={Link}
                          to={`/category/${categoryName}`}
                        >
                          {categoryName}
                        </Nav.Link>
                      ) : (
                        <NavDropdown
                          key={categoryName + index}
                          id='collasible-nav-dropdown'
                          title={categoryName}
                          onClick={(e) => {
                            navigate(`/category/${category._id}`);
                          }}
                          show={dropdownMainOpen[category._id]}
                          onMouseEnter={() =>
                            handleMouseMainEnter(category._id)
                          }
                          onMouseLeave={() =>
                            handleMouseMainLeave(category._id)
                          }
                        >
                          {renderSubcategories(category.subCategories)}
                        </NavDropdown>
                      )}
                    </>
                  );
                }
              )}
            </Nav>

            {isAuthenticated ? (
              <Nav>
                <Nav.Link
                  as={Link}
                  to='/checkout'
                >
                  <Button variant='outline-dark'>
                    <CartFill />
                  </Button>
                </Nav.Link>
                <Nav.Link
                // as={Link}
                // to='/customer/profile'
                >
                  <DropdownButton
                    as={ButtonGroup}
                    title='Account'
                  >
                    <Dropdown.Item
                      eventKey='1'
                      href='/customer/profile'
                      onClick={() => {
                        navigate(`/customer/profile`);
                      }}
                    >
                      <PersonCircle /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='2'
                      href='/customer/product-order'
                      onClick={() => {
                        navigate(`/customer/product-order`);
                      }}
                    >
                      <Truck /> My Order
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <BoxArrowLeft /> Logout
                    </Dropdown.Item>
                  </DropdownButton>
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link
                  as={Link}
                  to='/checkout'
                >
                  <Button variant='outline-dark'>
                    <CartFill />
                  </Button>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/login'
                >
                  <Button>Login</Button>
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/signup'
                >
                  <Button variant='outline-primary'>Sign Up</Button>
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
