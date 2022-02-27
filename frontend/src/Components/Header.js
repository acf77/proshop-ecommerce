import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLoginInfo = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginInfo;

  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
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
                    <i className="fas fa-shopping-cart"></i>{" "}
                    <i
                      className={`fas fa-${cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}`}
                    ></i>
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
                    <span>Hi, {userInfo.name}!</span>
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
