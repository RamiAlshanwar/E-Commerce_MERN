import express from "express";
import { getAll } from "../services/productServices";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAll();
  res.status(200).send(products);
});


export default router;