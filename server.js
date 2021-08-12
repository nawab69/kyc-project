import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import database from "./connectDB.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import kycRouter from "./routes/kycRoutes.js";
const app = express();
dotenv.config();
database();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/kyc", kycRouter);
app.use(errorHandler);
const server = app.listen(8000, () => console.log("Server is running"));
