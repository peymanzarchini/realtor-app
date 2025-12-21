import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
} from "@sequelize/core";
import { sequelize } from "../config/database.js";

export class AgentRating extends Model<
  InferAttributes<AgentRating>,
  InferCreationAttributes<AgentRating>
> {
  declare id: CreationOptional<number>;
  declare raterId: number;
  declare agentId: number;
  declare rating: number;
  declare comment: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
}

AgentRating.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    raterId: { type: DataTypes.INTEGER, allowNull: false },
    agentId: { type: DataTypes.INTEGER, allowNull: false },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: { type: DataTypes.TEXT, allowNull: true },
    createdAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "AgentRating",
    tableName: "agent_ratings",
    timestamps: true,
    updatedAt: false,
  }
);
