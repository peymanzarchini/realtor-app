import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";
import { Property } from "./property.model.js";
import { Feature } from "./feature.model.js";
import { PropertyImage } from "./propertyImage.model.js";

const models = {
  User,
  Property,
  Feature,
  PropertyImage,
};

// User Associations
User.hasMany(models.Property, {
  foreignKey: "agentId",
  as: "properties",
});
User.belongsToMany(models.Property, {
  through: "Favorites",
  as: "favoriteProperties",
  foreignKey: "userId",
  otherKey: "propertyId",
});

// Property Associations
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

// Feature Associations
Feature.belongsToMany(models.Property, {
  through: "PropertyFeatures",
  as: "properties",
  foreignKey: "featureId",
  otherKey: "propertyId",
});

// PropertyImage Associations
PropertyImage.belongsTo(models.Property, {
  foreignKey: "propertyId",
  as: "property",
});

export { sequelize, models };
