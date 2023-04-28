import { NextFunction, Request, Response } from "express";
import * as validator from "../utils/validation.util";
import {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.util";
import { hashPassword } from "../utils/auth.util";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ErrorMessage } from "../constants/errorMessages";
import UserModel from "../models/User.model";
import User, { Permission, Role } from "../types/user.type";
import ApiResponse, { ApiError } from "../utils/api.util";
import { generateUserPermissions } from "../utils/user.util";
import { AuthenticatedRequest } from "../types/auth.type";

/**
Creates a new user and saves it to the database.
* @function
* 
* @async
* 
* @param {Request} req - Express Request object.
* 
* @param {Response} res - Express Response object.
* 
* @param {NextFunction} next - Express NextFunction object.
* 
* @throws {ApiError} Will throw an error if the user already exists in the database.
* 
* @returns {Promise<void>}
*/ export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, role }: User = req.body;

    // Check if user already exists in the database
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApiError(
        HttpStatusCode.CONFLICT,
        `User with email ${email} already exists.`
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Set user role and permissions
    const isAdmin: boolean = role === "admin";
    const permissions = generateUserPermissions(role);

    // Create the new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      role: isAdmin ? Role.ADMIN : Role.USER,
      permissions,
    });

    await newUser.save();
    ApiResponse.success(res, HttpStatusCode.CREATED);
  } catch (err) {
    next(err);
  }
};

/**
Delete a user from database.
* @function
* 
* @async
* 
* @param {Request} req - Express Request object.
* 
* @param {Response} res - Express Response object.
* 
* @param {NextFunction} next - Express NextFunction object.
* 
* @throws {ApiError} Will throw an error if the user already exists in the database.
* 
* @returns {Promise<void>}
*/
export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Delete user and save to db
    await UserModel.findOneAndDelete({ email: req?.user?.email });

    ApiResponse.success(res, HttpStatusCode.OK);
  } catch (err) {
    next(err);
  }
};

/**
Updates a user and save it to the database.
* @function
* 
* @async
* 
* @param {Request} req - Express Request object.
* 
* @param {Response} res - Express Response object.
* 
* @param {NextFunction} next - Express NextFunction object.
* 
* @throws {ApiError} Will throw an error if the user already exists in the database.
* 
* @returns {Promise<void>}
*/
export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const filter = { email: req.user?.email };
    const update = {
      username,
      password: password ? await hashPassword(password) : password,
    };
    const options = {
      new: true,
    };

    // Update user
    await UserModel.findOneAndUpdate(filter, update, options);

    ApiResponse.success(res, HttpStatusCode.OK);
  } catch (err) {
    console.log("cont");
    next(err);
  }
};

/**
 * Login a user and update the database
 * @returns A Promise that resolves to the login user
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: User = req.body;

    // Validate email
    if (!validator.isValidEmail(email)) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.INVALID_EMAIL
      );
    }

    // Validate password
    if (!validator.isValidPassword(password)) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.INVALID_PASSWORD_LENGTH
      );
    }

    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        `User with email - ${email} not found.`
      );
    }

    // Check if the password is correct
    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        ErrorMessage.INVALID_PASSWORD
      );
    }

    // Update the user's isOnline field
    user.isOnline = true;

    // Generate access and refresh tokens
    const userInfo = {
      _id: user._id,
      username: user.username,
      email: user.email,
      isOnline: user.isOnline,
    };
    const accessToken = await generateAccessToken(userInfo);
    const refreshToken = await generateRefreshToken(userInfo);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    ApiResponse.success(res, HttpStatusCode.OK, {
      accessToken,
      refreshToken,
      user: {
        id: userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Logout a user and updates isOnline status to the database
 * @param email - The user's email address
 * @param password - The user's password
 * @returns A Promise that resolves to the Logout user
 */
export const logoutUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = {
      email: req.user?.email,
    };
    const update = {
      isOnline: false,
      $unset: { refreshToken: "" },
    };
    const options = {
      new: true,
    };
    await UserModel.findOneAndUpdate(filter, update, options);

    // res.clearCookie("refreshToken", { path: "/api/v1/auth/refresh-token" });
    res.clearCookie("refreshToken");

    ApiResponse.success(res, HttpStatusCode.OK);
  } catch (err) {
    next(err);
  }
};
