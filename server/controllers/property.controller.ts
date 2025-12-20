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
    const rawFilters = req.query;

    const page = rawFilters.page ? Number(rawFilters.page) : 1;
    const limit = rawFilters.limit ? Number(rawFilters.limit) : 10;

    const filters: PropertyFilters = {
      propertyType: rawFilters.propertyType as string,
      listingType: rawFilters.listingType as string,
      minPrice: rawFilters.minPrice ? Number(rawFilters.minPrice) : undefined,
      maxPrice: rawFilters.maxPrice ? Number(rawFilters.maxPrice) : undefined,
      bedrooms: rawFilters.bedrooms ? Number(rawFilters.bedrooms) : undefined,
      page: page,
      limit: limit,
    };
    const result = await propertyService.getAllProperties(filters);
    res.success("Properties list retrieved successfully", result, 200);
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const property = await propertyService.getPropertyById(Number(req.params.id));
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
