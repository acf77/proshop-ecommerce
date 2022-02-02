import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Product from "../Components/Product";
import { listProductDetails, listProducts } from "../actions/productActions";

import Message from "../Components/Message";
import Loader from "../Components/Loader";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // convert objects to array, so we can use .map()
  const arrayProducts = Object.entries(products);

  return (
    <>
      <h1> Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {arrayProducts.map((product) => (
            <Col key={product[1]._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product[1]} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
