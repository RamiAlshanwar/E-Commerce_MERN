import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import { seedInitialProduct } from "./services/productServices";
import productRoutes from "./routes/productRoutes";

const app = express();
const port = 3002;
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

seedInitialProduct();

app.use("/user", userRoute);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
