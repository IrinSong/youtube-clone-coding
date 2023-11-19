import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const usernameExists = await User.exists({ username: username });
  const emailExists = await User.exists({ email: email });
  if (usernameExists) {
    return res.status(400).render("join", { pageTitle: "Join", errorMessage: "This username is already taken." });
  }
  if (emailExists) {
    return res.status(400).render("join", { pageTitle: "Join", errorMessage: "This e-mail is already taken." });
  }
  // const exists = await User.exists({ $or: [{ username: username }, { email: email }] });
  // if (exists) {
  //   return res.render("join", { pageTitle: "Join", errorMessage: "This e-mail OR username is already taken." });
  // }
  if (password !== password2) {
    return res.status(400).render("join", { pageTitle: "Join", errorMessage: "Password confirmation does not match." });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => res.render("Login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username }); // = { username:username }
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password.",
    });
  }
  console.log("LOG USER IN! COMING SOON!");
  return res.redirect("/");
};
export const logout = (req, res) => res.send("Logout");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const users = (req, res) => res.send("User's Profile");
