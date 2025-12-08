/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { HttpError } from "../utils/httpError.js";
import { CreateUserDto } from "../types/dto.js";

const userRepository = new UserRepository();

export class AuthService {
  async register(userData: CreateUserDto) {
    const { email } = userData;
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpError("کاربری با این ایمیل قبلاً ثبت شده است", 409);
    }
    const finalUserData = {
      ...userData,
      role: userData.role ?? "client",
    };
    const newUser = await userRepository.create(finalUserData);
    return newUser;
  }

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user || !(await user.validPassword(password))) {
      throw new HttpError("ایمیل یا رمز عبور اشتباه است", 401);
    }
    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: "7d" });
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return { user: userWithoutPassword, token };
  }
}
