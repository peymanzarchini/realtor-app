export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar?: string;
  role?: "client" | "agent" | "admin";
}

export interface CreatePropertyDto {
  title: string;
  description: string;
  price?: number;
  rentPrice?: number;
  address: string;
  latitude?: number;
  longitude?: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt?: number;
  propertyType: "apartment" | "villa" | "office" | "land" | "shop";
  listingType: "sale" | "rent";
  status?: "available" | "sold" | "rented" | "pending";
}
export type UpdatePropertyDto = Partial<CreatePropertyDto>;

export interface PropertyFilters {
  search?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  page?: number;
  limit?: number;
}

export interface AddImageDto {
  url: string;
  isCover?: boolean;
}
