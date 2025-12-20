import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { RegisterBody } from "../validations/auth.validation.js";
import { HttpError } from "../utils/httpError.js";

const authService = new AuthService();

export const register = async (
  req: Request<unknown, unknown, RegisterBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } = req.body;

    const user = await authService.register({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
    });

    res.success("User registered successfully", user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.success("Login successful", { user, accessToken });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) throw new HttpError("Refresh token not found", 401);

    const accessToken = await authService.refresh(token);
    res.success("Token refreshed", { accessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.success("Logout successful", 200);
};
