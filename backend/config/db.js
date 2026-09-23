const mongoose = require("mongoose");
const dns = require("dns");

// Ensure DNS resolution succeeds even on networks with restrictive local DNS servers
try {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
    // Ignore if not permitted
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[Database Error] Connection failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
