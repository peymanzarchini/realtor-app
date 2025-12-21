import { Request, Response, NextFunction } from "express";
import { PropertyService } from "../services/property.service.js";
import type { CreatePropertyDto, UpdatePropertyDto, PropertyFilters } from "../types/dto.js";
import { HttpError } from "../utils/httpError.js";

const propertyService = new PropertyService();

export const createProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProperty = await propertyService.createProperty(
      req.body as CreatePropertyDto,
      req.user!.id
    );
    res.success("Property created successfully", newProperty, 201);
  } catch (error) {
    next(error);
  }
};

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = req.query;

    const filters: PropertyFilters = {
      search: q.search as string,
      propertyType: q.propertyType as string,
      listingType: q.listingType as string,
      minPrice: q.minPrice ? Number(q.minPrice) : undefined,
      maxPrice: q.maxPrice ? Number(q.maxPrice) : undefined,
      minArea: q.minArea ? Number(q.minArea) : undefined,
      maxArea: q.maxArea ? Number(q.maxArea) : undefined,
      bedrooms: q.bedrooms ? Number(q.bedrooms) : undefined,
      bathrooms: q.bathrooms ? Number(q.bathrooms) : undefined,
      sortBy: (q.sortBy as string) || "createdAt",
      sortOrder: (q.sortOrder as "ASC" | "DESC") || "DESC",
      page: q.page ? Number(q.page) : 1,
      limit: q.limit ? Number(q.limit) : 10,
    };
    const result = await propertyService.getAllProperties(filters);
    res.success("Properties list retrieved successfully", result, 200);
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const property = await propertyService.getPropertyById(id);

    propertyService.incrementViews(id).catch((err) => console.error("Views increment error:", err));

    res.success("Property details retrieved", property);
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProperty = await propertyService.updateProperty(
      Number(req.params.id),
      req.body as UpdatePropertyDto,
      req.user!.id,
      req.user!.role
    );
    res.success("Property updated successfully", updatedProperty);
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await propertyService.deleteProperty(Number(req.params.id), req.user!.id, req.user!.role);
    res.success("Property deleted successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const addImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new HttpError("No file uploaded", 400);
    }

    const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const isCover = req.body.isCover === "true";

    const image = await propertyService.addImageToProperty(Number(req.params.id), {
      url: fullUrl,
      isCover,
    });
    res.success("Image added successfully", image, 201);
  } catch (error) {
    next(error);
  }
};
