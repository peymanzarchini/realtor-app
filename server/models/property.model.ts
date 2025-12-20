import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import { sequelize } from "../config/database.js";

export class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare price: number | null;
  declare rentPrice: number | null;
  declare address: string;
  declare latitude: number | null;
  declare longitude: number | null;
  declare area: number;
  declare bedrooms: number;
  declare bathrooms: number;
  declare yearBuilt: number | null;
  declare propertyType: "apartment" | "villa" | "office" | "land" | "shop";
  declare listingType: "sale" | "rent";
  declare status: "available" | "sold" | "rented" | "pending";
  declare agentId: number;
}

Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Property title is required" },
        len: { args: [10, 150], msg: "Title must be between 10 and 150 characters" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Property description is required" },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { isNumeric: true, min: 0 },
    },
    rentPrice: {
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: { isNumeric: true, min: 0 },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Property address is required" },
      },
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { isFloat: true, min: -90, max: 90 },
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: { isFloat: true, min: -180, max: 180 },
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { isInt: true, min: 1 },
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 0 },
    },
    yearBuilt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { isInt: true, min: 1300 },
    },
    propertyType: {
      type: DataTypes.ENUM("apartment", "villa", "office", "land", "shop"),
      allowNull: false,
    },
    listingType: {
      type: DataTypes.ENUM("sale", "rent"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "sold", "rented", "pending"),
      allowNull: false,
      defaultValue: "available",
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Property",
    tableName: "properties",
  }
);
