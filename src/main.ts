import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import compression from "compression"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan"
import path from "path";
import fs from "node:fs"

import apiRouter from "./routes";
import { errorResponse } from "./middlewares/error.middleware";
import { rateLimiter } from "./middlewares/rate-limit.middleware";
import { FRONTEND_ORIGIN, PORT } from "./constant";

dotenv.config()

const app = express()

app.use(cors({
    credentials: true,
    origin: FRONTEND_ORIGIN,
    exposedHeaders: "X-Filename"
}))

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.use(rateLimiter)

app.use(compression())

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(helmet());

//serve static file for image
app.use(express.static(path.join(__dirname, "..", "public")));

// cookie middleware
app.use(cookieParser())

app.get("/api/ping", (req, res) => {
    return res.status(200).send({ status: 200, data: new Date(), message: "PING!" })
})
// api router 
const VERSIONING = "v1" as const
app.use(`/api/${VERSIONING}`, apiRouter)

// error response middleware
app.use(errorResponse)

app.listen(PORT, () => {
    // winstonLogger.info
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});