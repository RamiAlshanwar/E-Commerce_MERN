import express from "express";
import { loginUser, register } from "../services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { statusCode, data } = await register({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(statusCode).json(data);
  } catch (error) {
    console.error("POST /auth/register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { statusCode, data } = await loginUser({ email, password });

    return res.status(statusCode).json(data);
  } catch (error) {
    console.error("POST /auth/login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
