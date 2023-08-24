import { Link, Outlet, useNavigate } from "react-router-dom";
import { useCategoryTree } from "../../api/getCategoryTree";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useState } from "react";

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const HomeNav = () => {
  const categoryTree = useCategoryTree();
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

  const renderSubcategories = (subCategories) => {
    return Object.entries(subCategories).map(([categoryName, category]) => {
      return !isObjectEmpty(category.subCategories) ? (
        <NavDropdown
          id="basic-nav-dropdown"
          key={category._id}
          title={categoryName}
          className="p-0"
          show={dropdownSubOpen[category._id]}
          onMouseEnter={() => handleMouseSubEnter(category._id)}
          onMouseLeave={() => handleMouseSubLeave(category._id)}
          autoClose={"outside"}
          drop="end"
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
      <Navbar expand="lg" className="bg-body-tertiary m-0 pb-0 sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {Object.entries(categoryTree).map(
              ([categoryName, category], index) => {
                console.log("category", category);
                return (
                  <Nav key={index} className="">
                    {isObjectEmpty(category.subCategories) ? (
                      <Nav.Link as={Link} to={`/category/${categoryName}`}>
                        {categoryName}
                      </Nav.Link>
                    ) : (
                      <NavDropdown
                        id="collasible-nav-dropdown"
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
