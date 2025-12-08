/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from "./base.repository.js";
import { models } from "../models/index.js";
import type { Property } from "../models/property.model.js";
import { FindOptions, Op, WhereOptions } from "@sequelize/core";
import type { PropertyFilters } from "../types/dto.js";

export class PropertyRepository extends BaseRepository<Property> {
  constructor() {
    super(models.Property);
  }

  private buildWhereClause(filters: Omit<PropertyFilters, "page" | "limit">): WhereOptions {
    const whereClause: WhereOptions = {};

    if (filters.propertyType) whereClause.propertyType = filters.propertyType;
    if (filters.listingType) whereClause.listingType = filters.listingType;
    if (filters.bedrooms) whereClause.bedrooms = filters.bedrooms;

    const priceConditions: any = {};
    if (filters.minPrice !== undefined) {
      priceConditions[Op.gte] = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      priceConditions[Op.lte] = filters.maxPrice;
    }

    if (Object.keys(priceConditions).length > 0) {
      whereClause.price = priceConditions;
    }

    return whereClause;
  }

  findWithFilters(filters: PropertyFilters) {
    const { page, limit, ...otherFilters } = filters;

    const whereClause = this.buildWhereClause(otherFilters);
    const offset = page && limit ? (page - 1) * limit : undefined;

    const queryOptions: FindOptions = {
      where: whereClause,
      include: [
        {
          model: models.User,
          as: "agent",
          attributes: ["firstName", "lastName", "email"],
        },
        {
          model: models.PropertyImage,
          as: "images",
        },
        {
          model: models.Feature,
          as: "features",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    };
    return this.model.findAll(queryOptions);
  }

  async countWithFilters(filters: PropertyFilters): Promise<number> {
    const { ...otherFilters } = filters;

    const whereClause: WhereOptions = {};
    if (otherFilters.propertyType) whereClause.propertyType = otherFilters.propertyType;
    if (otherFilters.listingType) whereClause.listingType = otherFilters.listingType;
    if (otherFilters.bedrooms) whereClause.bedrooms = otherFilters.bedrooms;
    if (otherFilters.minPrice || otherFilters.maxPrice) {
      whereClause.price = {
        [Op.gte]: otherFilters.minPrice || 0,
        [Op.lte]: otherFilters.maxPrice || 999999999,
      };
    }

    return this.model.count({ where: whereClause });
  }

  findByIdWithDetails(id: number) {
    return this.model.findByPk(id, {
      include: [
        {
          model: models.User,
          as: "agent",
          attributes: ["firstName", "lastName", "email", "phoneNumber"],
        },
        { model: models.PropertyImage, as: "images" },
        {
          model: models.Feature,
          as: "features",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
  }
}
