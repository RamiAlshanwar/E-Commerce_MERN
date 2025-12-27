import express from "express";
import {
  addItemToCart,
  getActiveCartForUser,
  updateItemInCart,
  deleteItemInCart,
  clearCart,
  checkout,
} from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExRequest } from "../types/ExRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExRequest, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const cart = await getActiveCartForUser({ userId });
    return res.status(200).send(cart);
  } catch (error) {
    console.error("GET /cart error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/", validateJWT, async (req: ExRequest, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const response = await clearCart({ userId });
    return res.status(response.statusCode ?? 200).send(response.data);
  } catch (error) {
    console.error("DELETE /cart error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/items", validateJWT, async (req: ExRequest, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { productId, quantity } = req.body;

    const response = await addItemToCart({ userId, productId, quantity });
    return res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("POST /cart/items error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.put("/items", validateJWT, async (req: ExRequest, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { productId, quantity } = req.body;

    const response = await updateItemInCart({ userId, productId, quantity });
    return res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("PUT /cart/items error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/items/:productId", validateJWT, async (req: ExRequest, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { productId } = req.params;

    const response = await deleteItemInCart({ userId, productId });
    return res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("DELETE /cart/items/:productId error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/checkout", validateJWT, async (req: ExRequest, res) => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const { address } = req.body;

    const response = await checkout({ userId, address });
    return res.status(response.statusCode).send(response.data);
  } catch (error) {
    console.error("POST /cart/checkout error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

export default router;
