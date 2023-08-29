import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCategoryTree } from '../../api/getCategoryTree';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../store/authContext';

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

  const { accessToken } = useContext(AuthContext);
  const isAuthenticated = !!accessToken;

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
        className='bg-body-tertiary m-0 pb-0 sticky-top'
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to='/'
          >
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Col sm={8}>
              {Object.entries(categoryTree).map(
                ([categoryName, category], index) => {
                  console.log('category', category);
                  return (
                    <Nav
                      key={index}
                      className=''
                    >
                      {isObjectEmpty(category.subCategories) ? (
                        <Nav.Link
                          as={Link}
                          to={`/category/${categoryName}`}
                        >
                          {categoryName}
                        </Nav.Link>
                      ) : (
                        <NavDropdown
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
                    </Nav>
                  );
                }
              )}
            </Col>
            <Col sm={4}>
              {isAuthenticated ? (
                <Nav>
                  <Nav.Link
                    as={Link}
                    to='/profile'
                  >
                    Hello
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
            </Col>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
