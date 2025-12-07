import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import { sequelize } from "../config/database.js";
import type { Property } from "./property.model.js";

export class Feature extends Model<InferAttributes<Feature>, InferCreationAttributes<Feature>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Feature.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true },
    },
  },
  {
    sequelize,
    modelName: "Feature",
    tableName: "Features",
    timestamps: false,
  }
);

export const associate = (model: { Property: typeof Property }) => {
  Feature.belongsToMany(model.Property, {
    through: "PropertyFeatures",
    as: "properties",
    foreignKey: "featureId",
    otherKey: "propertyId",
  });
};
