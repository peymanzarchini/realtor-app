/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { HttpError } from "../utils/httpError.js";
import { CreateUserDto } from "../types/dto.js";

const userRepository = new UserRepository();

export class AuthService {
  private generateTokens(payload: object) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "20ms" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET!, { expiresIn: "7d" });
    return { accessToken, refreshToken };
  }

  async register(userData: CreateUserDto) {
    const { email } = userData;
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpError("A user with this email already exists", 409);
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
      throw new HttpError("Incorrect email or password", 401);
    }

    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const { accessToken, refreshToken } = this.generateTokens(tokenPayload);

    const { password: _, ...userWithoutPassword } = user.toJSON();
    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET!) as any;
      const newPayload = { id: decoded.id, email: decoded.email, role: decoded.role };
      const accessToken = jwt.sign(newPayload, process.env.JWT_SECRET!, { expiresIn: "20m" });

      return accessToken;
    } catch (error) {
      throw new HttpError("Invalid or expired refresh token", 401);
    }
  }
}
