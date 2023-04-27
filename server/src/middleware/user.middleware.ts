import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/auth.type";
import { ApiError } from "../utils/api.util";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ErrorMessage } from "../constants/errorMessages";
import * as validator from "../utils/validation.util";
import User from "../types/user.type";

const validateUserDeleteRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = req.user;

    if (user?.id !== userId) {
      throw new ApiError(
        HttpStatusCode.UNAUTHORIZED,
        ErrorMessage.UNAUTHORIZED_USER_ID_MISMATCH
      );
    }

    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};

const validateUserUpdateRequest = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { email } = req.body;
    const user = req.user;

    if (user?.id !== userId || user.email !== email) {
      throw new ApiError(
        HttpStatusCode.UNAUTHORIZED,
        ErrorMessage.UNAUTHORIZED_USER_ID_MISMATCH
      );
    }
    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};

/**
 *
 * Validates the req.body properties and values of a user object.
 * @param {AuthenticatedRequest} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
const validateUserRequestBody = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username, role }: User = req.body;
  try {
    // Validate request body properties
    if (req.method !== "PUT" && req.method !== "PATCH") {
      if (!email) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.MISSING_EMAIL
        );
      }

      if (!validator.isValidEmail(email)) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.INVALID_EMAIL
        );
      }

      if (!password) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.MISSING_PASSWORD
        );
      }

      if (!validator.isValidPassword(password)) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.INVALID_PASSWORD_LENGTH
        );
      }

      // Check request path, if path === 'login' move to next middleware.
      if (req.path === "/auth/login") {
        next();
        return;
      }

      if (!username) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.MISSING_USERNAME
        );
      }

      // Validate request.body Values
      if (!validator.isValidName(username)) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.INVALID_USERNAME
        );
      }

      if (!role) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.MISSING_ROLE
        );
      }

      if (!validator.isValidRole(role)) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.INVALID_ROLE
        );
      }
    }

    // POST, PATCH method
    if (req.method === "PUT" || req.method === "PATCH") {
      const id = req.params.userId;

      if (!username && !password) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          "Missing 'password' and 'username' fields. Please provide at least one property to update."
        );
      }

      if (username && !validator.isValidName(username)) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.INVALID_USERNAME
        );
      }

      if (password && !validator.isValidPassword(password)) {
        throw new ApiError(
          HttpStatusCode.BAD_REQUEST,
          ErrorMessage.INVALID_PASSWORD_LENGTH
        );
      }

      next();
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};

export {
  validateUserDeleteRequest,
  validateUserUpdateRequest,
  validateUserRequestBody,
};
