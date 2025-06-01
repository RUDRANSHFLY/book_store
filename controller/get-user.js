import User from "../model/user-schema.js";

export default async function getUser(req,res) {
    try {
        const user = await User.findOne({email : req.user.email})
        res.status(200).json({"message" : "sucess" , user})
    } catch (error) {
        console.log("Error while fetching userInfo : ", error);
        res.status(400).json({"message" : "Not Email found" })
    }
}