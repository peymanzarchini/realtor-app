import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
} from "@sequelize/core";
import sequelize from "../config/db.js";
import Property from "./property.model.js";

class PropertyImage extends Model<
  InferAttributes<PropertyImage>,
  InferCreationAttributes<PropertyImage>
> {
  declare id: CreationOptional<number>;
  declare url: string;
  declare isCover: boolean;
  declare propertyId: number;

  declare getProperty: BelongsToGetAssociationMixin<Property>;

  public static associate(models: { Property: typeof Property }) {
    PropertyImage.belongsTo(models.Property, {
      foreignKey: "propertyId",
      as: "property",
    });
  }
}

PropertyImage.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false, validate: { isUrl: true } },
    isCover: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Property, key: "id" },
    },
  },
  {
    sequelize,
    modelName: "PropertyImage",
    tableName: "PropertyImage",
    timestamps: false,
  }
);

export default PropertyImage;
