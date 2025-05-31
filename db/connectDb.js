import mongoose from "mongoose"
import "dotenv/config"

export default async function connectDB(){
    const dbUrl = process.env.DATABASE_URL

    if (!dbUrl) {
        throw new Error("Database url not found...! 🚫")
    }

    try {
        const db = await mongoose.connect(dbUrl);
        console.log("Database connected successfully! ✅");
        return db;

    } catch (error) {
        console.log(`❌ Error connecting to the Database : ${error}`);
        throw new Error(`Database connection failed : ${error.message}`)
    }

}