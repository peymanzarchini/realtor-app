import "dotenv/config";
import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { responseMiddleware } from "./middlewares/response.js";
import { errorHandler } from "./middlewares/errorHandler.js";

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(corsMiddleware);
  app.use(responseMiddleware);

  app.use(errorHandler);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}

startServer();
