import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import { HttpError } from "../utils/httpError.js";
import jwt from "jsonwebtoken";

export default class UserController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password, phoneNumber, avatar, role } = req.body;

      const isUserExists = await User.findOne({ where: { email } });
      if (isUserExists) {
        throw new HttpError("A user has registered with this email", 400);
      }

      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        avatar,
        role,
      });
      res.success("Registration was successful", user, 201);
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.scope("withPassword").findOne({ where: { email } });
      if (!user) {
        throw new HttpError("User not found", 404);
      }

      const isValid = await user.validPassword(password);
      if (!isValid) {
        throw new HttpError("Wrong credentials!", 401);
      }

      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          phoneNumber: user.phoneNumber,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );
      res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .send("Login successful");
    } catch (error) {
      next(error);
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, avatar, password } = req.body;
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw new HttpError("You can only update your own account!", 401);
      }
      const updateUser = await user.update({ firstName, lastName, email, avatar, password });
      res.success("User information was successfully updated.", updateUser, 200);
    } catch (error) {
      next(error);
    }
  }

  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken");
      res.success("User has been logged out!", null, 200);
    } catch (error) {
      next(error);
    }
  }
}
