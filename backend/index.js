const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/api");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Standard middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "TaskFlow Manager API is active" });
});

// Mount routes on /api and root / for direct specification matching
app.use("/api", taskRoutes);
app.use("/", taskRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`[Server] Server running on http://localhost:${PORT}`);
});
