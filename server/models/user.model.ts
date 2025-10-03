import {
  BelongsToManyAddAssociationMixin,
  CreationOptional,
  DataTypes,
  HasManyCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";
import sequelize from "../config/db.js";
import bcrypt from "bcrypt";
import type Property from "./property.model.js";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare phoneNumber: string;
  declare avatar: string;
  declare role: "client" | "agent" | "admin";
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  declare createProperty: HasManyCreateAssociationMixin<Property>;
  declare addFavoriteProperty: BelongsToManyAddAssociationMixin<Property, number>;

  public async validPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  public static associate(models: { Property: typeof Property }) {
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
      set(value: string) {
        this.setDataValue("firstName", value.trim());
      },
      validate: {
        notNull: {
          msg: "firstName is required",
        },
        len: {
          args: [3, 40],
          msg: "firstName must be between 3 and 40 characters long",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      set(value: string) {
        this.setDataValue("lastName", value.trim());
      },
      validate: {
        notNull: {
          msg: "lastName is required",
        },
        len: {
          args: [3, 40],
          msg: "lastName must be between 3 and 40 characters long",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_email",
        msg: "email must be unique",
      },
      validate: {
        isEmail: {
          msg: "email must be a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required",
        },
        is: {
          args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
          msg: "password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_phone_number",
        msg: "This phone number is already in use",
      },
      validate: {
        notNull: {
          msg: "phoneNumber is required",
        },
        is: {
          args: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/],
          msg: "phoneNumber must be a valid phone number",
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          msg: "avatar must be a valid URL",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("client", "agent", "admin"),
      allowNull: false,
      defaultValue: "client",
      validate: {
        isIn: {
          args: [["client", "agent", "admin"]],
          msg: "role must be one of the following: client, agent, admin",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: { attributes: { exclude: [] as string[] } },
    },
    hooks: {
      async beforeCreate(user: User): Promise<void> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      },
      async beforeUpdate(user: User): Promise<void> {
        if (user.changed("password")) {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      },
    },
  }
);

export default User;
