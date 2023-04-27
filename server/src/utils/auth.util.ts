import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "./api.util";
import { HttpStatusCode } from "../constants/httpStatusCode";
import { ErrorMessage } from "../constants/errorMessages";

/**
 * Generates a new refresh token using the provided payload.
 *
 * @param {object} payload - The payload to include in the refresh token.
 * @returns {string} The generated refresh token.
 */
const generateRefreshToken = async (payload: any): Promise<string> => {
  try {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      ErrorMessage.AUTH_TOKEN_FAILURE
    );
  }
};

/**
 * Generates a new access token using the provided payload.
 *
 * @param {object} payload - The payload to include in the access token.
 * @returns {string} The generated access token.
 */
const generateAccessToken = async (payload: object): Promise<string> => {
  try {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      ErrorMessage.AUTH_TOKEN_FAILURE
    );
  }
};

/**
 * Verifies the provided access token and returns the decoded payload.
 *
 * @param {string} token - The access token to verify.
 * @returns {User} The decoded payload of the access token.
 * @throws {Error} If the token is invalid or has expired.
 */
const verifyAccessToken = async (token: any): Promise<string | JwtPayload> => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.UNAUTHORIZED,
      ErrorMessage.INVALID_ACCESS_TOKEN
    );
  }
};

/**
 * Verifies the provided refresh token and returns the decoded payload.
 *
 * @param {string} token - The refresh token to verify.
 * @returns {object} The decoded payload of the refresh token.
 * @throws {Error} If the token is invalid or has expired.
 */
const verifyRefreshToken = async (token: any): Promise<string | JwtPayload> => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.UNAUTHORIZED,
      ErrorMessage.INVALID_REFRESH_TOKEN
    );
  }
};

/**
 * Hashes the provided password using bcrypt.
 *
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A Promise that resolves with the hashed password.
 */
const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      ErrorMessage.HASH_PASSWORD_ERROR
    );
  }
};

/**
 * Compares the provided password with a hashed password using bcrypt.
 *
 * @param {string} password - The password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A Promise that resolves with a boolean indicating whether the passwords match.
 */
const comparePasswords = async (password: string, hashedPassword: string) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new ApiError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      ErrorMessage.COMPARE_PASSWORD_ERROR
    );
  }
};

export {
  generateRefreshToken,
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashPassword,
  comparePasswords,
};
