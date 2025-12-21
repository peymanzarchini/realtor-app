import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";
import { Property } from "./property.model.js";
import { Feature } from "./feature.model.js";
import { PropertyImage } from "./propertyImage.model.js";
import { AgentRating } from "./agentRating.model.js";

const models = {
  User,
  Property,
  Feature,
  PropertyImage,
  AgentRating,
};

/**
 * User - Property (Agent Relationship)
 * An agent has many properties.
 */
User.hasMany(models.Property, {
  foreignKey: "agentId",
  as: "properties", // This is for properties managed by the agent
});
Property.belongsTo(models.User, {
  foreignKey: "agentId",
  as: "agent",
});

/**
 * User - Property (Favorites Relationship)
 * Users can favorite many properties.
 * We define it once and use 'inverse' to set the alias on the other side.
 */
User.belongsToMany(models.Property, {
  through: "favorites",
  as: "favoriteProperties", // Alias for User.getFavoriteProperties()
  foreignKey: "userId",
  otherKey: "propertyId",
  inverse: {
    as: "favoritedBy", // Alias for Property.getFavoritedBy()
  },
});

/**
 * User - AgentRating (Rating Relationship)
 */
User.hasMany(models.AgentRating, {
  foreignKey: "agentId",
  as: "receivedRatings",
});
AgentRating.belongsTo(models.User, {
  foreignKey: "raterId",
  as: "rater",
});
// Optional: If you want to see ratings an agent has received
AgentRating.belongsTo(models.User, {
  foreignKey: "agentId",
  as: "agent",
});

/**
 * Property - Feature (Many-to-Many)
 */
Property.belongsToMany(models.Feature, {
  through: "property_features",
  as: "features",
  foreignKey: "propertyId",
  otherKey: "featureId",
});
Feature.belongsToMany(models.Property, {
  through: "property_features",
  as: "properties",
  foreignKey: "featureId",
  otherKey: "propertyId",
});

/**
 * Property - PropertyImage (One-to-Many)
 */
Property.hasMany(models.PropertyImage, {
  foreignKey: "propertyId",
  as: "images",
});
PropertyImage.belongsTo(models.Property, {
  foreignKey: "propertyId",
  as: "property",
});

export { sequelize, models };
