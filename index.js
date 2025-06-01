import express from "express"
import "dotenv/config"
import connectDB from "./db/connectDb.js"
import authRouter from "./routes/auth-route.js"
import { bookRouter } from "./routes/book-route.js"





const app = express()
const PORT = process.env.PORT || 3000  



app.use(express.json());

await connectDB();


app.use('/api/auth',authRouter)
app.use('/api/',bookRouter)

app.get('/',(req,res) => {
    res.send("Server")
})

app.listen(PORT,() => {
    console.log(`Server started 🌟`);
    console.log(`http://localhost:${PORT}`)
})