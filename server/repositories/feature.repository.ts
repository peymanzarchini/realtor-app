import { Feature } from "../models/feature.model.js";
import { models } from "../models/index.js";
import { BaseRepository } from "./base.repository.js";

export class FeatureRepository extends BaseRepository<Feature> {
  constructor() {
    super(models.Feature);
  }

  /**
   * Find a feature by its unique name
   */

  async findByName(name: string): Promise<Feature | null> {
    return this.model.findOne({ where: { name } });
  }
}
