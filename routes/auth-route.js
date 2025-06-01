import express from "express"
import createUser from "../controller/create-user.js";
import logInUser from "../controller/login-user.js";
import getUser from "../controller/get-user.js";
import authenticateToken from "../controller/authenticate-token.js";


const authRouter = express.Router();


authRouter.post('/register',(req,res) => {
    return createUser(req,res);
});

authRouter.get('/login',(req,res) => {
    return logInUser(req,res)
});

authRouter.get('/userinfo', authenticateToken , (req,res) => {
    return getUser(req , res)
})



export default authRouter;