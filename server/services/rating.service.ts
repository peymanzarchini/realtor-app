/* eslint-disable @typescript-eslint/no-explicit-any */
import { RatingRepository } from "../repositories/rating.repository.js";
import { UserRepository } from "../repositories/user.repository.js";
import { HttpError } from "../utils/httpError.js";
import { UserRole } from "../constants/roles.js";

const ratingRepository = new RatingRepository();
const userRepository = new UserRepository();

export class RatingService {
  async rateAgent(raterId: number, agentId: number, rating: number, comment?: string) {
    if (raterId === agentId) {
      throw new HttpError("You cannot rate yourself", 400);
    }

    const agent = await userRepository.findById(agentId);
    if (!agent) {
      throw new HttpError("User not found", 404);
    }

    if (agent.role !== UserRole.AGENT) {
      throw new HttpError("This user is not an agent and cannot be rated", 404);
    }

    const existing = await ratingRepository.findOne({ where: { raterId, agentId } as any });

    if (existing) {
      await ratingRepository.update(existing.id, { rating, comment } as any);
      return ratingRepository.findById(existing.id);
    }

    return await ratingRepository.create({ raterId, agentId, rating, comment } as any);
  }
}
