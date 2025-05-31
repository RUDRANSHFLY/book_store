import express from "express"
import "dotenv/config"
import connectDB from "./db/connectDb.js"





const app = express()
const PORT = process.env.PORT || 3000  



app.use(express.json());

await connectDB();




app.listen(PORT,() => {
    console.log(`Server started 🌟`);
    console.log(`http://localhost:${PORT}`)
})