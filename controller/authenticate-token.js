import jwt from "jsonwebtoken"
import "dotenv/config"


export default async function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        console.log("Token Not Found 🗑️"); 
        return res.status(404).json({ message: "Token Not Found 🗑️" });
    }

    const accessToken = process.env.ACCESS_TOKEN_SECRET;

    if(!accessToken){
        console.log("ACCESS TOKEN SECRET not found 🚨");
        throw new Error('ACCESS TOKEN SECRET not found 🚨')
    }


    jwt.verify(token,accessToken,(err,user) => {
        if(err){
            console.log("Expired Token ⏳"); 
            return res.status(404).json({ message: "Expired Token⏳" }); 
        }
        req.user = user
        next();
    })


}