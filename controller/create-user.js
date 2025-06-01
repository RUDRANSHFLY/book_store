import bcrypt from "bcrypt"
import {validateEmail} from "../util/validate-email.js"
import User from "../model/user-schema.js"


export default async function createUser(req,res){
    console.log(`Request URL: ${req.url}, Request Method: ${req.method}`);


    const { userName, password , email, phoneNumber, occupation  } = req.body; 

    if(!userName.trim() || !password.trim() || !email.trim()){
        const missingUrl = "Missing mandatory values : "+
            `${!userName.trim() ? 'userName' : ''} ` + 
            `${!password.trim() ? 'password' : ''} ` +
            `${!email.trim() ? 'email' : ''} `

        console.log(missingUrl + "🚨")

        return res.status(400).json({
            error : missingUrl
        })
    }

    const data = [userName , password , email , occupation ]

    console.table(data)

    const isValid = validateEmail(email)

    if(!isValid){
        const isNotValidUrl = 'Not valid email 🚫'
        console.log(isNotValidUrl)
        return res.status(400).json({
            error: isNotValidUrl
        });
    }

    // ? Secured and Encrypted Password
    const hashedPassword = await bcrypt.hash(password.trim(),10)


    try {
        const user = new User({
            userName : userName,
            email : email,
            password : hashedPassword,
            phoneNumber : phoneNumber,
            occupation : occupation,
        });

        await user.save();

        console.log("New User Created ✅")
        return res.status(201).json({
            "message" : "success",
            "data" : user,
        })
        
    } catch (error) {
        if(error.code === 11000){
            const field = Object.keys(error.keyValue)[0]; 
            const value = error.keyValue[field]; 
            console.log(`${field} '${value}' already exists.`)
            return res.status(409).json({ error: `${field} '${value}' already exists.` });
        } else {
            console.error('Error creating user:', error); 
            return res.status(500).json({ error: 'Internal server error' }); 
        }
    }




}