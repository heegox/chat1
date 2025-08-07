import express from "express";
import { checkAuth, login, signup, updateProfile } from "../controlers/UserController.js";
import { protectRoute } from "../middleware/Auth.js";



const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/Login", login);
userRouter.put("/update-profile", protectRoute, updateProfile);
userRouter.get("/check", protectRoute, checkAuth);


export default userRouter;