import { Request, Response, NextFunction } from "express";
import { FeatureService } from "../services/feature.service.js";

const featureService = new FeatureService();

/**
 * Get all available features for selection
 */
export const listFeatures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await featureService.getAllFeatures();
    res.success("Features catalog retrieved", data);
  } catch (error) {
    next(error);
  }
};

/**
 * Assign selected features to a specific property
 */
export const updatePropertyFeatures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const propertyId = Number(req.params.id);
    const { featureIds } = req.body; // Expecting an array of numbers [1, 2, 5]

    const result = await featureService.linkFeaturesToProperty(propertyId, featureIds);
    res.success("Property amenities updated successfully", result);
  } catch (error) {
    next(error);
  }
};
