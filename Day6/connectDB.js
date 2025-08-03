import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

async function ConnectDB() {
    const connectionString = process.env.MONGO_URI;  // Read from .env

    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error Connecting to MongoDB:", error.message);
    }
}

export default ConnectDB;
