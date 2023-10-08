import express from "express";

import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//env file
dotenv.config({ path: "./config/.env" });

//connect to database
connectDB();

//back-end security against malicious requests
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//parser
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));

//static
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is running"));
