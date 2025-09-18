import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
} from "@sequelize/core";

import sequelize from "../config/db.js";
import User from "./user.model.js";
import type PropertyImage from "./propertyImage.model.js";
import type Feature from "./feature.model.js";

class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
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
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare getAgent: BelongsToGetAssociationMixin<User>;
  declare getImages: HasManyGetAssociationsMixin<PropertyImage>;
  declare addFeature: BelongsToManyAddAssociationMixin<Feature, number>;
  declare addFavoritedByUser: BelongsToManyAddAssociationMixin<User, number>;

  public static associate(models: {
    User: typeof User;
    PropertyImage: typeof PropertyImage;
    Feature: typeof Feature;
  }) {
    Property.belongsTo(models.User, {
      foreignKey: "agentId",
      as: "agent",
    });

    Property.hasMany(models.PropertyImage, {
      foreignKey: "propertyId",
      as: "images",
    });

    Property.belongsToMany(models.Feature, {
      through: "PropertyFeatures",
      as: "features",
      foreignKey: "propertyId",
      otherKey: "featureId",
    });

    Property.belongsToMany(models.User, {
      through: "Favorites",
      as: "favoritedByUsers",
      foreignKey: "propertyId",
      otherKey: "userId",
    });
  }
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
        notNull: {
          msg: "title is required",
        },
        len: {
          args: [10, 150],
          msg: "title must be between 10 and 150 characters",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "description is required",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      },
    },
    rentPrice: {
      type: DataTypes.BIGINT,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 0,
      },
    },
    address: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "address is required",
        },
      },
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true,
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isFloat: true,
        min: -180,
        max: 180,
      },
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 0,
      },
    },
    yearBuilt: { type: DataTypes.INTEGER, allowNull: true, validate: { isInt: true, min: 1300 } },
    propertyType: {
      type: DataTypes.ENUM("apartment", "villa", "office", "land", "shop"),
      allowNull: false,
    },
    listingType: { type: DataTypes.ENUM("sale", "rent"), allowNull: false },
    status: {
      type: DataTypes.ENUM("available", "sold", "rented", "pending"),
      allowNull: false,
      defaultValue: "available",
    },
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Property",
    tableName: "Properties",
  }
);

export default Property;
