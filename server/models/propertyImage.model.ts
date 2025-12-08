import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import { sequelize } from "../config/database.js";
import type { Property } from "./property.model.js";

export class PropertyImage extends Model<
  InferAttributes<PropertyImage>,
  InferCreationAttributes<PropertyImage>
> {
  declare id: CreationOptional<number>;
  declare url: string;
  declare isCover: boolean;
  declare propertyId: number;
}

PropertyImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: { msg: "Invalid image URL" } },
    },
    isCover: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Properties" as never, key: "id" },
    },
  },
  {
    sequelize,
    modelName: "PropertyImage",
    tableName: "PropertyImages",
    timestamps: false,
  }
);

export const associate = (models: { Property: typeof Property }) => {
  PropertyImage.belongsTo(models.Property, {
    foreignKey: "propertyId",
    as: "property",
  });
};
