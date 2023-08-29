import { Link, Outlet, useNavigate, useEffect } from 'react-router-dom';
import { useCategoryTree } from '../api/getCategoryTree';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../store/authContext';

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
                        onMouseEnter={() => handleMouseMainEnter(category._id)}
                        onMouseLeave={() => handleMouseMainLeave(category._id)}
                      >
                        {renderSubcategories(category.subCategories)}
                      </NavDropdown>
                    )}
                  </Nav>
                );
              }
            )}
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
                  to='/login'
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to='/signup'
                >
                  Sign Up
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
