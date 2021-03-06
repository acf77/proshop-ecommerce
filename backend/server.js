import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();
connectDB();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () =>
  console.log(
    `Backend started in ${process.env.NODE_ENV} mode on http://localhost:${port}`
  )
);
