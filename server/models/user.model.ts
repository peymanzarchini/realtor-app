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
        notNull: { msg: "نام الزامی است" },
        len: { args: [3, 40], msg: "نام خانوادگی باید بین 3 تا 40 کاراکتر باشد" },
      },
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notNull: { msg: "نام خانوادگی الزامی است" },
        len: { args: [3, 40], msg: "نام خانوادگی باید بین 3 تا 40 کاراکتر باشد" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: "unique_email", msg: "این ایمیل قبلاً ثبت شده است" },
      validate: { isEmail: { msg: "ایمیل معتبر نیست" } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "رمز عبور الزامی است" },
        len: { args: [8, 255], msg: "رمز عبور باید حداقل 8 کاراکتر باشد" },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: "unique_phone_number", msg: "این شماره تلفن قبلاً ثبت شده است" },
      validate: {
        notNull: { msg: "شماره تلفن الزامی است" },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: { msg: "آدرس آواتار معتبر نیست" } },
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
