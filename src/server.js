// const express = require("express");
import express from "express";
import morgan from "morgan";
import "./db";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger); //순서가 중요! middleware를 전체에 적용하려면 맨 위에 있어야 함.
app.use(express.urlencoded({ extended: true })); // express application이 form의 value들을 javascript object 형식으로 이해할 수 있도록 함.
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
