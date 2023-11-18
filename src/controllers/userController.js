import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const usernameExists = await User.exists({ username: username });
  const emailExists = await User.exists({ email: email });
  if (usernameExists) {
    return res.render("join", { pageTitle: "Join", errorMessage: "This username is already taken." });
  }
  if (emailExists) {
    return res.render("join", { pageTitle: "Join", errorMessage: "This e-mail is already taken." });
  }
  // const exists = await User.exists({ $or: [{ username: username }, { email: email }] });
  // if (exists) {
  //   return res.render("join", { pageTitle: "Join", errorMessage: "This e-mail OR username is already taken." });
  // }
  if (password !== password2) {
    return res.render("join", { pageTitle: "Join", errorMessage: "Password confirmation does not match." });
  }
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const users = (req, res) => res.send("User's Profile");
