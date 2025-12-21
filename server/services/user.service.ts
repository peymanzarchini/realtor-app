/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRepository } from "../repositories/user.repository.js";
import { HttpError } from "../utils/httpError.js";
import { models } from "../models/index.js";
import { fn, col } from "@sequelize/core"; // Direct import to avoid the 'models.sequelize' error

const userRepository = new UserRepository();

export class UserService {
  /**
   * Get paginated list of agents sorted by top ratings
   */
  async getAgentsList(page: number, limit: number) {
    const { rows, count } = await userRepository.findAgentsWithRatings(page, limit);

    return {
      agents: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
    };
  }

  /**
   * Get detailed agent profile including their property listings and rating summary
   */
  async getAgentProfile(agentId: number) {
    const agent = await models.User.findOne({
      where: { id: agentId, role: "agent" },
      include: [
        {
          model: models.Property,
          as: "properties",
          include: [{ model: models.PropertyImage, as: "images" }], // Include property images for the UI
        },
      ],
    });

    if (!agent) {
      throw new HttpError("Agent not found", 404);
    }

    // Calculate rating summary using direct fn and col imports
    const ratingsSummary = await models.AgentRating.findAll({
      where: { agentId } as any,
      attributes: [
        [fn("AVG", col("rating")), "average"],
        [fn("COUNT", col("id")), "count"],
      ],
      raw: true,
    });

    const ratingData = ratingsSummary[0] as any;

    return {
      agent,
      rating: {
        average: ratingData.average ? parseFloat(ratingData.average).toFixed(1) : "0.0",
        count: ratingData.count || 0,
      },
    };
  }
}
