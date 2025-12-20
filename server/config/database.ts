import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import "dotenv/config";

export const sequelize = new Sequelize({
  dialect: MySqlDialect,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ force: true });
      console.log("✅ Database synchronized.");
    }
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};
