import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCategoryTree } from '../../api/getCategoryTree';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { useState } from 'react';
// import { useContext } from 'react';
// import { AuthContext } from '../../store/authContext';
import { useAuth } from '../../store/authContext';

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const HomeNav = () => {
  const { categoryTree } = useCategoryTree();
  const [dropdownMainOpen, setDropdownMainOpen] = useState({});
  const [dropdownSubOpen, setDropdownSubOpen] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log('categoryTree', categoryTree);
  }, [categoryTree]);

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

  const { isUserAuthenticated, getAuthenticatedUserInfo, Logout } = useAuth();
  const isAuthenticated = isUserAuthenticated();
  const userInfo = getAuthenticatedUserInfo();

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
            navigate(`/category/${categoryName}`);
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
            navigate(`/category/${categoryName}`);
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
                            navigate(`/category/${categoryName}`);
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-cart-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                    </svg>
                  </Button>
                </Nav.Link>
                <Nav.Link
                // as={Link}
                // to='/customer/profile'
                >
                  <DropdownButton
                    as={ButtonGroup}
                    title='UserName'
                  >
                    {userInfo.role.slice(1, -1) === 'customer' ? (
                      <Dropdown.Item
                        eventKey='1'
                        href='/customer/profile'
                        onClick={() => {
                          navigate(`/customer/profile`);
                        }}
                      >
                        Profile
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        eventKey='2'
                        href='/seller/profile'
                        onClick={() => {
                          navigate(`/seller/profile`);
                        }}
                      >
                        Profile
                      </Dropdown.Item>
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-cart-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
                    </svg>
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
