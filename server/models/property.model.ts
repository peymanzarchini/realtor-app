import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import { sequelize } from "../config/database.js";
import type { User } from "./user.model.js";
import type { Feature } from "./feature.model.js";
import type { PropertyImage } from "./propertyImage.model.js";

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
        notNull: { msg: "عنوان ملک الزامی است" },
        len: { args: [10, 150], msg: "عنوان باید بین 10 تا 150 کاراکتر باشد" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "توضیحات ملک الزامی است" },
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
        notNull: { msg: "آدرس ملک الزامی است" },
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
      references: { model: "Users" as never, key: "id" },
    },
  },
  {
    sequelize,
    modelName: "Property",
    tableName: "Properties",
  }
);

export const associate = (models: {
  User: typeof User;
  Feature: typeof Feature;
  PropertyImage: typeof PropertyImage;
}) => {
  Property.belongsTo(models.User, {
    foreignKey: "agentId",
    as: "agent",
  });

  Property.belongsToMany(models.Feature, {
    through: "PropertyFeatures",
    as: "features",
    foreignKey: "propertyId",
    otherKey: "featureId",
  });

  Property.hasMany(models.PropertyImage, {
    foreignKey: "propertyId",
    as: "images",
  });
};
