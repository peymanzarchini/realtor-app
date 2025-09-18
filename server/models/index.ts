import sequelize from "../config/db.js";
import User from "./user.model.js";
import Property from "./property.model.js";
import PropertyImage from "./propertyImage.model.js";
import Feature from "./feature.model.js";

const models = {
  User,
  Property,
  PropertyImage,
  Feature,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, User, Property, PropertyImage, Feature };
