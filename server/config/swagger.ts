import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate API Documentation",
      version: "1.0.0",
      description: "مستندات کامل پروژه املاک - تمامی فیلدها و تست‌های API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Property: {
          type: "object",
          required: ["title", "description", "address", "area", "propertyType", "listingType"],
          properties: {
            title: {
              type: "string",
              minLength: 10,
              maxLength: 150,
              example: "آپارتمان ۱۰۰ متری لوکس در زعفرانیه",
            },
            description: { type: "string", example: "دارای دید عالی، متریال درجه یک، لابی مجلل" },
            price: { type: "number", description: "قیمت کل (برای فروش)", example: 12000000000 },
            rentPrice: {
              type: "number",
              description: "قیمت اجاره ماهانه (برای رهن/اجاره)",
              example: 45000000,
            },
            address: { type: "string", example: "تهران، زعفرانیه، خیابان اصلی" },
            latitude: { type: "number", format: "float", example: 35.8 },
            longitude: { type: "number", format: "float", example: 51.4 },
            area: { type: "integer", description: "متراژ ملک به متر مربع", example: 100 },
            bedrooms: { type: "integer", minimum: 0, example: 2 },
            bathrooms: { type: "integer", minimum: 0, example: 2 },
            yearBuilt: { type: "integer", minimum: 1300, example: 1402 },
            propertyType: {
              type: "string",
              enum: ["apartment", "villa", "office", "land", "shop"],
            },
            listingType: { type: "string", enum: ["sale", "rent"] },
            status: {
              type: "string",
              enum: ["available", "sold", "rented", "pending"],
              default: "available",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["client", "agent", "admin"] },
          },
        },
      },
    },
  },
  apis: [path.join(process.cwd(), "src/routes/*.ts"), path.join(process.cwd(), "dist/routes/*.js")],
};

export const swaggerSpec = swaggerJSDoc(options);
