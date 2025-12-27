import express from "express";
import { getAll } from "../services/productServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAll();
    return res.status(200).send(products);
  } catch (error) {
    console.error("GET /products error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
