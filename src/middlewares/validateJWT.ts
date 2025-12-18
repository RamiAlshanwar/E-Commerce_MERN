import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExRequest } from "../types/ExRequest";
const validateJWT = (req: ExRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader) {
    res.status(403).send("authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }

  jwt.verify(token, "aE1vQ6wYxpEkpMABF1EnR0hPdw6BUsrt",async (err, payload) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }
    if (!payload) {
      res.status(403).send("invalid token payload");
    }
    //to avoid error from typescript
    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };
    // fetxh user from database based on the payload
    const user = await userModel.findOne({ email: userPayload.email });
    req.user = user
    next();
  });
};

export default validateJWT;
