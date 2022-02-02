import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Message from "../Components/Message";
import Loader from "../Components/Loader";

import FormContainer from "../Components/FormContainer";
import { Login } from "../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const redirect = () => {};

  // For some unexplainable reason, the redux dispatch login action doesn't work, here's a workaround //
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.reload();
      setLoading(false);
    } else {
      setError(true);
      // setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && (
        <Message variant="danger">Houver um erro ao tentar logar!</Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormLabel>Email address</FormLabel>
          <FormControl
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Don't have an account?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
