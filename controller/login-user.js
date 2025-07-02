import bcrypt from "bcrypt";
import User from "../model/user-schema.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function logInUser(req, res) {
  try {
    const { email, password } = req.body;

    const data = [email, password];

    console.table(data[1]);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("No user exist with this email 🚨");
      return res.status(401).json({ error: "No user exist with this email" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log("Invalid password 🚨");
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = process.env.ACCESS_TOKEN_SECRET;

    if (!accessToken) {
      console.log("ACCESS TOKEN SECRET not found 🚨");
      throw new Error("ACCESS TOKEN SECRET not found 🚨");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      accessToken,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("❌ Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
