import { BaseRepository } from "./base.repository.js";
import { models } from "../models/index.js";
import type { User } from "../models/user.model.js";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(models.User);
  }
  findByEmail(email: string): Promise<User | null> {
    return this.model.withScope("withPassword").findOne({
      where: { email },
    });
  }
}
