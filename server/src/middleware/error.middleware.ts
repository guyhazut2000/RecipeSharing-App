import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ApiError } from "../utils/api.util";

// Define a global error handling middleware function
export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong.";

  return res.status(statusCode).json({ error: { code: statusCode, message } });
};
