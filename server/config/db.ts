import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const port = DB_HOST ? parseInt(DB_PORT!, 10) : undefined;

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  logging: false,
  port: port,
});

try {
  await sequelize.authenticate();
  console.log("Database connection has been established successfully");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  process.exit(1);
}

export default sequelize;
