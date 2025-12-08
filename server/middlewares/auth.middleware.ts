import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";
import { AuthenticatedJwtPayload } from "../types/express.js";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;
    if (!token) {
      return next(new HttpError("Access denied. No token provided.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthenticatedJwtPayload;
    req.user = {
      id: decoded.id,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new HttpError("Invalid token.", 401));
    } else {
      next(error);
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new HttpError("Authentication required.", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new HttpError("You do not have permission to perform this action.", 403));
    }

    next();
  };
};
