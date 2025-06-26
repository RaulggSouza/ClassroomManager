import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config(); 

const app = express();
routes(app);

export default app;