/**
 * AuthenticatedRequest Interface representing a Request with authenticate user in the application
 */
import { Request } from "express";
import { AuthenticateUser } from "./user.type";
/**
 * Interface representing a Authenticated Request in the application.
 * Extends the Express Request interface.
 */
export interface AuthenticatedRequest extends Request {
  user?: AuthenticateUser;
}
