import { Link, useNavigate } from "react-router-dom";
import { useCategoryTree } from "../../api/getCategoryTree";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  CartFill,
  PersonCircle,
  Truck,
  BoxArrowLeft,
} from "react-bootstrap-icons";
import React from "react";

import { useState } from "react";
import { useAuth } from "../../store/authContext";

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const HomeNav = () => {
  const { categoryTree } = useCategoryTree();
  const [dropdownOpen, setDropdownOpen] = useState({});
  const navigate = useNavigate();
  const { isUserAuthenticated, Logout } = useAuth();
  const isAuthenticated = isUserAuthenticated();

  const handleLogout = () => {
    const route = Logout();
    // Redirect the user to the specified route
    window.location.href = route;
  };

  const handleMouseEnter = (categoryId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [categoryId]: true,
    }));
  };

  const handleMouseLeave = (categoryId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [categoryId]: false,
    }));
  };

  const renderCategoryDropdown = (category, categoryName, isParent) => {
    console.log();
    return (
      <NavDropdown
        key={category._id}
        id="basic-nav-dropdown"
        title={categoryName}
        className="p-0"
        show={dropdownOpen[category._id]}
        onMouseEnter={() => handleMouseEnter(category._id)}
        onMouseLeave={() => handleMouseLeave(category._id)}
        autoClose={"outside"}
        drop={isParent ? "down-centered" : "end"}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/category/${category._id}`);
        }}
      >
        {renderSubcategories(category.subCategories)}
      </NavDropdown>
    );
  };

  const renderSubcategories = (subCategories) => {
    return Object.entries(subCategories).map(([categoryName, category]) => {
      return !isObjectEmpty(category.subCategories) ? (
        <React.Fragment key={category._id}>
          {renderCategoryDropdown(category, categoryName, false)}
        </React.Fragment>
      ) : (
        <NavDropdown.Item
          key={category._id}
          eventKey="1"
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

  return (
    <>
      <Navbar
        key={"navasd"}
        expand="lg"
        className="m-0 pb-0 sticky-top justify-content-between navbar-light bg-white"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            {/* Home0 */}
            <img src="/logo.png" alt="logo" width="40" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ maxHeight: "100px" }} className="me-auto">
              {Object.entries(categoryTree).map(([categoryName, category]) => {
                return (
                  <React.Fragment key={category._id}>
                    {isObjectEmpty(category.subCategories) ? (
                      <Nav.Link
                        key={category._id}
                        as={Link}
                        to={`/category/${category._id}`}
                      >
                        {categoryName}
                      </Nav.Link>
                    ) : (
                      <React.Fragment key={category._id}>
                        {renderCategoryDropdown(category, categoryName, true)}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
              })}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/checkout">
                <Button variant="outline-dark">
                  <CartFill />
                </Button>
              </Nav.Link>

              {isAuthenticated ? (
                <>
                  <Navbar.Collapse>
                    <DropdownButton title="Account" className="">
                      <Dropdown.Item
                        eventKey="1"
                        href="/customer/profile"
                        onClick={() => {
                          navigate(`/customer/profile`);
                        }}
                      >
                        <PersonCircle /> Profile
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        href="/customer/product-order"
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
                  </Navbar.Collapse>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <Button>Login</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    <Button variant="outline-primary">Sign Up</Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
