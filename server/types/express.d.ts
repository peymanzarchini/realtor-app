import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface AuthenticatedJwtPayload extends JwtPayload, AuthenticatedUser {}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
    export interface Response {
      success: <T>(message: string, body: T, status?: number) => Response;
      fail: <T>(message: string, body?: T, status?: number) => Response;
    }
  }
}
export {};
