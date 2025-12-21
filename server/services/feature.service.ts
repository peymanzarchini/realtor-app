/* eslint-disable @typescript-eslint/ban-ts-comment */
import { models } from "../models/index.js";
import { FeatureRepository } from "../repositories/feature.repository.js";
import { HttpError } from "../utils/httpError.js";

const featureRepository = new FeatureRepository();

export class FeatureService {
  /**
   * List all available amenities in the system
   */
  async getAllFeatures() {
    return await featureRepository.findAll();
  }

  /**
   * Create a new amenity (Used by Admin or Seeder)
   */

  async createFeature(name: string) {
    const existing = await featureRepository.findByName(name);
    if (existing) return existing;
    return await featureRepository.create({ name });
  }

  /**
   * Assign multiple features to a property at once
   * This overrides previous assignments (Sync logic)
   */
  async linkFeaturesToProperty(propertyId: number, featureIds: number[]) {
    const property = await models.Property.findByPk(propertyId);
    if (!property) {
      throw new HttpError("Property not found", 404);
    }

    // Using Sequelize magic method 'setFeatures' for Many-to-Many linkage
    // @ts-ignore
    await property.setFeatures(featureIds);

    return { success: true, count: featureIds.length };
  }
}
