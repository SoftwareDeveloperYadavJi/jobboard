import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            // Modern mongoose doesn't need these options as they're defaults now
            // but you can add specific options if needed
        });

        console.log("MongoDB connected successfully");

        // Add event listeners for connection issues
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        // Handle application termination
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("MongoDB connection closed due to app termination");
            process.exit(0);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;