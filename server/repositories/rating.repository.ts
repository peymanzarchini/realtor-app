/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from "./base.repository.js";
import { models } from "../models/index.js";
import { AgentRating } from "../models/agentRating.model.js";
import { fn, col } from "@sequelize/core";

export class RatingRepository extends BaseRepository<AgentRating> {
  constructor() {
    super(models.AgentRating);
  }

  async getAverageRating(agentId: number) {
    const result = await this.model.findAll({
      where: { agentId } as any,
      attributes: [
        [fn("AVG", col("rating")), "average"],
        [fn("COUNT", col("id")), "count"],
      ],
      raw: true,
    });

    const data = result[0] as unknown as { average: string | null; count: number };
    return {
      average: data.average ? parseFloat(data.average).toFixed(1) : "0.0",
      count: data.count,
    };
  }
}
