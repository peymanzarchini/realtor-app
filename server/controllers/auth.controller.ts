import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { LoginBody, RegisterBody } from "../validations/auth.validation.js";

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

    res.success("کاربر با موفقیت ثبت شد", user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.success("ورود با موفقیت انجام شد", { user });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.success("خروج با موفقیت انجام شد", 200);
};
