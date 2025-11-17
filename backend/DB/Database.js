import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL not found in environment variables');
        }
        
        const {connection} = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true
        });

        console.log(`MongoDB Connected to ${connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}