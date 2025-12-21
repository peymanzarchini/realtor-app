import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate API Documentation",
      version: "1.0.0",
      description:
        "Comprehensive documentation for the Real Estate management platform - includes all endpoints, schemas, and API tests.",
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
              example: "Luxury 3-Bedroom Apartment in City Center",
            },
            description: {
              type: "string",
              example: "Features high-end finishes, great views, and 24/7 security.",
            },
            price: {
              type: "number",
              description: "Total price for sale listings",
              example: 450000,
            },
            rentPrice: {
              type: "number",
              description: "Monthly rent price for rent listings",
              example: 2500,
            },
            address: { type: "string", example: "123 Main St, Downtown, Metropolis" },
            latitude: { type: "number", format: "float", example: 40.7128 },
            longitude: { type: "number", format: "float", example: -74.006 },
            area: { type: "integer", description: "Property area in square meters", example: 120 },
            bedrooms: { type: "integer", minimum: 0, example: 3 },
            bathrooms: { type: "integer", minimum: 0, example: 2 },
            yearBuilt: { type: "integer", minimum: 1900, example: 2022 },
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
