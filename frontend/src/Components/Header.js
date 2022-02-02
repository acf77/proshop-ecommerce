import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("userInfo"));
  //   setUserInfo(data);
  // }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                {cartItems.length > 0 ? (
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>
                    <i className="fas fa-circle"></i>
                    <span> Cart</span>
                  </Nav.Link>
                ) : (
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>
                    <span> Cart</span>
                  </Nav.Link>
                )}
              </LinkContainer>
              {userInfo ? (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <i className="fas fa-user"></i>
                    <span> Hi, {userInfo.name}!</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">My profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
