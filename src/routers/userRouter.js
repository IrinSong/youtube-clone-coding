import express from "express";
import { logout, users, edit, remove } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id", users);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);

export default userRouter;
