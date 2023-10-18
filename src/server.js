// const express = require("express");
import express from "express";

const PORT = 4000;
const app = express();

const looger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("Home");
};
const handleLogin = (req, res) => {
  return res.send("Login here");
};

app.use(looger);
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
