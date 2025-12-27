import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes";
import { seedInitialProduct } from "./services/productServices";
import productRoutes from "./routes/productRoutes";
import cartRoute from "./routes/cartRoute";
dotenv.config();

const app = express();
const port = 3002;
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));

seedInitialProduct();

app.use("/user", userRoute);
app.use("/products", productRoutes);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
