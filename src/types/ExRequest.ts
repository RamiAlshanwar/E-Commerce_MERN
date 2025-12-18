import { Request } from "express";

export interface ExRequest extends Request {
  user?: any;
}
