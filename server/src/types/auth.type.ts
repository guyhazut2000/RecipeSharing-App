import { Request } from "express";
import { AuthenticateUser } from "./user.type";

export interface AuthenticatedRequest extends Request {
  user?: AuthenticateUser;
}
