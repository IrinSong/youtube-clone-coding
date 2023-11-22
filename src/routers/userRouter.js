import express from "express";
import { logout, edit, remove, startGithubLogin, finishGithubLogin, users } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id", users);

export default userRouter;
