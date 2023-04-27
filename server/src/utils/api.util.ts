import { Response } from "express";
import { HttpStatusCode } from "../constants/httpStatusCode";
/**
 * ApiResponse class that provides static methods to create responses for successful API requests and API errors.
 */
export default class ApiResponse {
  /**
   * Static method that creates a successful API response with the provided data.
   * @param res The Express Response object.
   * @param statusCode The HTTP status code to be set in the response.
   * @param data The data to be included in the response.
   */
  static success(
    res: Response,
    statusCode: HttpStatusCode | number,
    data?: any
  ) {
    const response = {
      success: true,
      data: data,
    };
    res.status(statusCode).json(response);
  }

  /**
   * Static method that throws an API error with the provided status code and error message.
   * @param statusCode The HTTP status code to be set in the error response.
   * @param message The error message to be included in the error response.
   * @throws {ApiError} Throws an ApiError with the provided status code and error message.
   */
  static error(statusCode: HttpStatusCode | number, message: string) {
    throw new ApiError(statusCode, message);
  }
}

/**
 * ApiError class that extends the built-in Error class and includes an HTTP status code.
 */
class ApiError extends Error {
  statusCode: number | HttpStatusCode;
  constructor(statusCode: number | HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export { ApiError };
