import { Request, Response } from "express";
import UserModel from "../models/User.model";
import { generateAccessToken, verifyRefreshToken } from "../utils/auth.util";
import User from "../types/user.type";
import { ApiError } from "../utils/api.util";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { NextFunction } from "connect";

/**
 * Creates a new user and saves it to the database
 * @param username - The user's username
 * @param email - The user's email address
 * @param password - The user's password
 * @returns A Promise that resolves to the newly created user
 */
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    console.log(refreshToken);

    if (!refreshToken) {
      throw new ApiError(
        HttpStatusCode.UNAUTHORIZED,
        "No refreshToken provided in HTTP-only cookie."
      );
    }

    const decodedToken = (await verifyRefreshToken(refreshToken)) as User;
    const user = await UserModel.findOne({ _id: decodedToken._id })
      .select("-password -role -permissions -__v")
      .exec();

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Invalid refresh token.");
    }
    user.refreshToken = undefined;

    // issue new access token
    const accessToken = await generateAccessToken(user.toObject());
    res.json({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};
