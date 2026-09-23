const mongoose = require("mongoose");
const dns = require("dns");

// Ensure DNS resolution succeeds even on networks with restrictive local DNS servers
try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
    // Ignore if not permitted
}

let cachedConn = null;

const connectDB = async () => {
    if (cachedConn && mongoose.connection.readyState === 1) {
        return cachedConn;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000,
        });
        cachedConn = conn;
        console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`[Database Error] Connection failed: ${error.message}`);
        if (!process.env.NETLIFY) {
            process.exit(1);
        }
        throw error;
    }
};

module.exports = connectDB;
