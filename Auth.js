import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";




// Middleware to protect routes

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;

        const decoded = jwt.verify(token, process.env.jwt_SECRET)

        const user = await UserModel.findById(decoded.userId).select("-password");

        if(!user) return res.json({ success: false, Message: "User not found"});
        req.user = user;
        next();

    } catch (error) {
        console.log(error.Message);
     res.json({ success: false, message: error.message});

    }
}