import { Request, Response, NextFunction } from "express";
import { RatingService } from "../services/rating.service.js";
import { PropertyService } from "../services/property.service.js";
import { UserService } from "../services/user.service.js";

const ratingService = new RatingService();
const propertyService = new PropertyService();
const userService = new UserService();

export const rateAgent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rating, comment } = req.body;
    const agentId = Number(req.params.id);
    const raterId = req.user!.id;

    const result = await ratingService.rateAgent(raterId, agentId, rating, comment);
    res.success("Rating submitted successfully", result);
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const propertyId = Number(req.params.id);
    const userId = req.user!.id;
    const result = await propertyService.toggleFavorite(userId, propertyId);
    res.success(result.isFavorite ? "Added to favorites" : "Removed from favorites", result);
  } catch (error) {
    next(error);
  }
};

export const getAgents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await userService.getAgentsList(page, limit);
    res.success("Agents retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getAgentDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agentId = Number(req.params.id);
    const result = await userService.getAgentProfile(agentId);
    res.success("Agent profile retrieved successfully", result);
  } catch (error) {
    next(error);
  }
};
