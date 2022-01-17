import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { products } from "./data/products.js";

const app = express();
const env = dotenv.config();
connectDB();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () =>
  console.log(
    `Backend started in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
);
