/* eslint-disable @typescript-eslint/no-explicit-any */
import { models, sequelize } from "../models/index.js";
import { PropertyRepository } from "../repositories/property.repository.js";
import { RatingRepository } from "../repositories/rating.repository.js";
import {
  AddImageDto,
  CreatePropertyDto,
  PropertyFilters,
  UpdatePropertyDto,
} from "../types/dto.js";
import { HttpError } from "../utils/httpError.js";

const propertyRepository = new PropertyRepository();
const ratingRepository = new RatingRepository();

export class PropertyService {
  async createProperty(propertyData: CreatePropertyDto, agentId: number) {
    const finalPropertyData = {
      ...propertyData,
      agentId,
      status: propertyData.status ?? "available",
    };
    const newProperty = await propertyRepository.create(finalPropertyData);
    return propertyRepository.findByIdWithDetails(newProperty.id);
  }

  async getAllProperties(filters: PropertyFilters) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;

    const properties = await propertyRepository.findWithFilters({ ...filters, page, limit });

    const totalCount = await propertyRepository.countWithFilters(filters);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: properties,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    };
  }

  async getPropertyById(id: number) {
    const property = await propertyRepository.findByIdWithDetails(id);
    if (!property) {
      throw new HttpError("Property not found", 404);
    }

    // گرفتن میانگین امتیاز ایجنت این ملک
    const ratingData = await ratingRepository.getAverageRating(property.agentId);

    // اضافه کردن امتیاز به خروجی
    const propertyJson = property.toJSON();
    (propertyJson as any).agent.rating = ratingData;

    return propertyJson;
  }

  async updateProperty(
    id: number,
    updateData: UpdatePropertyDto,
    userId: number,
    userRole: string
  ) {
    const property = await this.getPropertyById(id);
    if (property.agentId !== userId && userRole !== "admin") {
      throw new HttpError("You are not authorized to edit this property", 403);
    }
    await propertyRepository.update(id, updateData);
    return this.getPropertyById(id);
  }

  async deleteProperty(id: number, userId: number, userRole: string) {
    const property = await this.getPropertyById(id);
    if (property.agentId !== userId && userRole !== "admin") {
      throw new HttpError("You are not authorized to delete this property", 403);
    }
    await propertyRepository.delete(id);
  }

  async addImageToProperty(propertyId: number, imageData: AddImageDto) {
    const { url, isCover } = imageData;

    // استفاده از تراکنش برای تضمین اینکه فقط یک تصویر Cover بماند
    return await sequelize.transaction(async (t) => {
      if (isCover) {
        await models.PropertyImage.update(
          { isCover: false },
          { where: { propertyId }, transaction: t }
        );
      }
      return models.PropertyImage.create(
        { url, propertyId, isCover: isCover ?? false },
        { transaction: t }
      );
    });
  }

  async incrementViews(propertyId: number) {
    return await models.Property.increment("viewsCount", {
      where: { id: propertyId },
    });
  }

  async toggleFavorite(userId: number, propertyId: number) {
    const user = await models.User.findByPk(userId);
    if (!user) throw new HttpError("User not found", 404);

    // 1. Fetch the property to check the owner
    const property = await this.getPropertyById(propertyId);

    // 2. Business Logic: Prevent favoriting own listing
    if (property.agentId === userId) {
      throw new HttpError("You cannot add your own property to favorites", 400);
    }

    // 3. Continue with toggle logic
    const hasFavorite = await (user as any).hasFavoriteProperty(propertyId);

    if (hasFavorite) {
      await (user as any).removeFavoriteProperty(propertyId);
      return { isFavorite: false };
    } else {
      await (user as any).addFavoriteProperty(propertyId);
      return { isFavorite: true };
    }
  }
}
