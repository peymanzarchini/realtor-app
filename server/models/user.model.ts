import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "@sequelize/core";
import { sequelize } from "../config/database.js";
import bcrypt from "bcrypt";
import type { Property } from "./property.model.js";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare phoneNumber: string;
  declare avatar: CreationOptional<string>;
  declare role: "client" | "agent" | "admin";

  async validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notNull: { msg: "First name is required" },
        len: { args: [3, 40], msg: "Last name must be between 3 and 40 characters" },
      },
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notNull: { msg: "Last name is required" },
        len: { args: [3, 40], msg: "Last name must be between 3 and 40 characters" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: "unique_email", msg: "This email is already registered" },
      validate: { isEmail: { msg: "Invalid email" } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        len: { args: [8, 255], msg: "Password must be at least 8 characters" },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: "unique_phone_number", msg: "This phone number is already registered" },
      validate: {
        notNull: { msg: "Phone number is required" },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: { msg: "Invalid avatar URL" } },
    },
    role: {
      type: DataTypes.ENUM("client", "agent", "admin"),
      allowNull: false,
      defaultValue: "client",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",

    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: { attributes: { include: ["password"] } },
    },
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export const associate = (models: { Property: typeof Property }) => {
  User.hasMany(models.Property, { foreignKey: "agentId", as: "properties" });
  User.belongsToMany(models.Property, {
    through: "Favorites",
    as: "favoriteProperties",
    foreignKey: "userId",
    otherKey: "propertyId",
  });
};
