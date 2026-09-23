const mongoose = require("mongoose");

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
