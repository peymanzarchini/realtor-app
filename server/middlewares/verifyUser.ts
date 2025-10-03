import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
import { HttpError } from "../utils/httpError.js";

export interface JwtPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

const verifyToken = (token: string, secret: string) => {
  return new Promise<DefaultJwtPayload | string>((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // Bearer Token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    //Cookie Token
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new HttpError("Authentication token is missing!", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const decoded = await verifyToken(token, process.env.JWT_SECRET);

    if (typeof decoded === "string") {
      throw new HttpError("Invalid token payload!", 403);
    }

    const { id, firstName, lastName, email, role } = decoded as JwtPayload;
    req.user = { id, firstName, lastName, email, role };

    next();
  } catch (error) {
    next(error);
  }
};
