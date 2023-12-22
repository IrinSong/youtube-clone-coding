import express from "express";
import {
  logout,
  getEdit,
  postEdit,
  remove,
  startGithubLogin,
  finishGithubLogin,
  users,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectMiddleware, logout);
userRouter.route("/edit").all(protectMiddleware).get(getEdit).post(postEdit);
userRouter.route("/change-password").all(protectMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/delete", remove);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", users);

export default userRouter;
