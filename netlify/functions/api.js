const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../../backend/config/db");
const taskRoutes = require("../../backend/routes/api");
const { notFound, errorHandler } = require("../../backend/middlewares/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Parse raw buffer or string body emitted by serverless-http in AWS/Netlify Lambda
app.use((req, res, next) => {
    if (Buffer.isBuffer(req.body)) {
        try {
            req.body = JSON.parse(req.body.toString("utf-8"));
        } catch (e) {
            req.body = {};
        }
    } else if (typeof req.body === "string" && req.body.trim()) {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {}
    }
    next();
});

// Ensure MongoDB Atlas is connected before routing requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("[Netlify Function DB Error]:", err.message);
        return res.status(500).json({
            success: false,
            message: `Database connection error: ${err.message}`,
        });
    }
});

// Mount routes across all path variations
app.use("/.netlify/functions/api/tasks", taskRoutes);
app.use("/.netlify/functions/api", taskRoutes);
app.use("/tasks", taskRoutes);
app.use("/api", taskRoutes);
app.use("/", taskRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

module.exports.handler = serverless(app);
