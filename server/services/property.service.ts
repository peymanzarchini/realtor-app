import { models } from "../models/index.js";
import { PropertyRepository } from "../repositories/property.repository.js";
import {
  AddImageDto,
  CreatePropertyDto,
  PropertyFilters,
  UpdatePropertyDto,
} from "../types/dto.js";
import { HttpError } from "../utils/httpError.js";

const propertyRepository = new PropertyRepository();

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
      throw new HttpError("ملکی با این مشخصات یافت نشد", 404);
    }
    return property;
  }

  async updateProperty(
    id: number,
    updateData: UpdatePropertyDto,
    userId: number,
    userRole: string
  ) {
    const property = await this.getPropertyById(id);
    if (property.agentId !== userId && userRole !== "admin") {
      throw new HttpError("شما اجازه ویرایش این ملک را ندارید", 403);
    }
    await propertyRepository.update(id, updateData);
    return this.getPropertyById(id);
  }

  async deleteProperty(id: number, userId: number, userRole: string) {
    const property = await this.getPropertyById(id);
    if (property.agentId !== userId && userRole !== "admin") {
      throw new HttpError("شما اجازه حذف این ملک را ندارید", 403);
    }
    await propertyRepository.delete(id);
  }

  async addImageToProperty(propertyId: number, imageData: AddImageDto) {
    const { url, isCover } = imageData;
    if (isCover) {
      await models.PropertyImage.update({ isCover: false }, { where: { propertyId } });
    }
    const finalIsCover = isCover ?? false;

    return models.PropertyImage.create({
      url,
      propertyId,
      isCover: finalIsCover,
    });
  }
}
