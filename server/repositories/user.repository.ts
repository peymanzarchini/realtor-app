import { BaseRepository } from "./base.repository.js";
import { models } from "../models/index.js";
import type { User } from "../models/user.model.js";
import { literal } from "@sequelize/core"; // Direct import from core

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(models.User);
  }

  /**
   * Fetch agents with their calculated average ratings using SQL subqueries
   */
  async findAgentsWithRatings(page: number, limit: number) {
    const offset = (page - 1) * limit;

    return this.model.findAndCountAll({
      where: { role: "agent" },
      attributes: {
        include: [
          // Subquery for average rating calculation
          [
            literal(`(
              SELECT AVG(rating)
              FROM agent_ratings
              WHERE agent_ratings.agentId = User.id
            )`),
            "averageRating",
          ],
          // Subquery for total rating count
          [
            literal(`(
              SELECT COUNT(id)
              FROM agent_ratings
              WHERE agent_ratings.agentId = User.id
            )`),
            "ratingsCount",
          ],
        ],
      },
      // Sorting logic: Highest average rating at the top
      order: [[literal("averageRating"), "DESC"]],
      limit,
      offset,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.model.withScope("withPassword").findOne({
      where: { email },
    });
  }
}
