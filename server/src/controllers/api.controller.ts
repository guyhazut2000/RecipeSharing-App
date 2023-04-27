import { Response } from "express";
import { HttpStatusCode } from "../constants/httpStatusCode";

export class ApiResponse {
  public static success(res: Response, statusCode: HttpStatusCode, data?: any) {
    const response = {
      success: true,
      data: data,
    };
    res.status(statusCode).json(response);
  }

  public static error(
    res: Response,
    statusCode: HttpStatusCode,
    message: string
  ) {
    console.log("sdfsdf");
    const response = {
      success: false,
      error: {
        code: statusCode,
        message: message,
      },
    };
    res.status(statusCode).json(response);
  }
}
