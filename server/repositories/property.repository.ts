/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from "./base.repository.js";
import { models } from "../models/index.js";
import type { Property } from "../models/property.model.js";
import { FindOptions, Op, Order, WhereOptions } from "@sequelize/core";
import type { PropertyFilters } from "../types/dto.js";

export class PropertyRepository extends BaseRepository<Property> {
  constructor() {
    super(models.Property);
  }

  private buildWhereClause(filters: Omit<PropertyFilters, "page" | "limit">): WhereOptions {
    const whereClause: Record<string | symbol, any> = {};

    if (filters.search) {
      whereClause[Op.or] = [
        {
          title: { [Op.substring]: filters.search },
        },
        {
          description: { [Op.substring]: filters.search },
        },
        {
          address: { [Op.substring]: filters.search },
        },
      ];
    }

    if (filters.propertyType) whereClause.propertyType = filters.propertyType;
    if (filters.listingType) whereClause.listingType = filters.listingType;
    if (filters.bedrooms) whereClause.bedrooms = filters.bedrooms;
    if (filters.bathrooms) whereClause.bathrooms = filters.bathrooms;

    const priceField = filters.listingType === "rent" ? "rentPrice" : "price";
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      whereClause[priceField] = {};
      if (filters.minPrice !== undefined) whereClause[priceField][Op.gte] = filters.minPrice;
      if (filters.maxPrice !== undefined) whereClause[priceField][Op.lte] = filters.maxPrice;
    }

    if (filters.minArea !== undefined || filters.maxArea !== undefined) {
      whereClause.area = {};
      if (filters.minArea !== undefined) whereClause.area[Op.gte] = filters.minArea;
      if (filters.maxArea !== undefined) whereClause.area[Op.lte] = filters.maxArea;
    }

    return whereClause as WhereOptions;
  }

  async findWithFilters(filters: PropertyFilters) {
    const { page, limit, sortBy, sortOrder, ...otherFilters } = filters;

    const whereClause = this.buildWhereClause(otherFilters);
    const offset = page && limit ? (page - 1) * limit : 0;

    const order: Order = [];
    if (sortBy) {
      order.push([sortBy, sortOrder || "DESC"]);
    } else {
      order.push(["createdAt", "ASC"]);
    }

    const queryOptions: FindOptions = {
      where: whereClause,
      include: [
        {
          model: models.User,
          as: "agent",
          attributes: ["firstName", "lastName"],
        },
        {
          model: models.PropertyImage,
          as: "images",
        },
        {
          model: models.Feature,
          as: "features",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      order,
      limit: limit || 10,
      offset,
    };
    return this.model.findAll(queryOptions);
  }

  async countWithFilters(filters: PropertyFilters): Promise<number> {
    const whereClause = this.buildWhereClause(filters);
    return this.model.count({ where: whereClause });
  }

  async findByIdWithDetails(id: number) {
    return this.model.findByPk(id, {
      include: [
        {
          model: models.User,
          as: "agent",
          attributes: ["firstName", "lastName", "email", "phoneNumber"],
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
    });
  }
}
