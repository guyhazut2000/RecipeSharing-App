import { Response, NextFunction, Request } from "express";
import { verifyAccessToken } from "../utils/auth.util";
import UserModel from "../models/User.model";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ApiError } from "../utils/api.util";
import { ErrorMessage } from "../constants/errorMessages";
import { AuthenticatedRequest } from "../types/auth.type";
import User from "../types/user.type";

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.MISSING_TOKEN
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.MISSING_TOKEN_HEADER
      );
    }

    const decodedToken = (await verifyAccessToken(accessToken)) as User;
    const userId = decodedToken._id.toString();

    // Find user in Database
    const user = await UserModel.findById({
      _id: userId,
    });

    if (!user) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
    }

    req.user = user;
    next(); // Call next middleware or route
  } catch (error) {
    return next(error);
  }
};
