import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { setHeaders } from "./middlewares/headers.js";
import { errorHandler } from "./middlewares/error.js";
import userRoutes from "./routes/userRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";

const __dirname = path.resolve();

const app = express();

//env file
dotenv.config();

//connect to database
connectDB();

//parser
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(setHeaders);

//cookie
app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);
app.use("/api/listing", listingRoutes);

//static
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//errorHandler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is running"));
