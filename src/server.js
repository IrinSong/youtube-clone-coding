// const express = require("express");
import express from "express";
import morgan from "morgan";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

const handleHome = (req, res) => {
  return res.send("Home");
};
const handleLogin = (req, res) => {
  return res.send("Login here");
};

app.use(logger); //순서가 중요! middleware를 전체에 적용하려면 맨 위에 있어야 함.
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
