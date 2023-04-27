import { Request, Response, NextFunction } from "express";

const logUserActivity = (req: Request, res: Response, next: NextFunction) => {
  // Check if the user is logging in
  if (req.path === "/auth/login" && req.method === "POST") {
    console.log(
      `User ${req.body.email} logged in at ${new Date().toUTCString()}`
    );
  } else if (req.path === "/auth/logout" && req.method === "POST") {
    console.log(
      `User ${req.body.email} logged out at ${new Date().toUTCString()}`
    );
  }
  // Call the next middleware function
  next();
};

export default logUserActivity;
