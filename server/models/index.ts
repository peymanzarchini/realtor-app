import { sequelize } from "../config/database.js";
import { User, associate as userAssociate } from "./user.model.js";
import { Property, associate as propertyAssociate } from "./property.model.js";
import { Feature, associate as featureAssociate } from "./feature.model.js";
import { PropertyImage, associate as propertyImageAssociate } from "./propertyImage.model.js";

const models = { User, Property, Feature, PropertyImage };

userAssociate(models);
propertyAssociate(models);
featureAssociate(models);
propertyImageAssociate(models);

export { sequelize, models };
