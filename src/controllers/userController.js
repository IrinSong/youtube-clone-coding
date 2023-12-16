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
  const user = await User.findOne({ username, githubAccout: false }); // = { username:username }
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
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseURL = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  return res.redirect(finalURL);
};
export const finishGithubLogin = async (req, res) => {
  const baseURL = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${params}`;
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiURL = "https://api.github.com";
    const userData = await (
      await fetch(`${apiURL}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiURL}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const email = emailData.find((email) => email.primary == true && email.verified == true).email;
    if (!email) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: userData.name ? userData.name : userData.login,
        avatarUrl: userData.avatarUrl,
        githubAccout: true,
        username: userData.login,
        email: email,
        password: "",
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, location }, //form에서 'name'을 쓰지 않으면 적용되지 X
  } = req;
  // const id = req.session.user.id;
  // const { name, email, location } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      location,
    },
    { new: true } //mongoose한테 가장 최근 업데이트된 object를 원한다고 전달
  );
  // req.session.user = {
  //   ...req.session.user,
  //   name,
  //   email,
  //   location,
  // };
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};
export const remove = (req, res) => res.send("Delete User");
export const users = (req, res) => res.send("User's Profile");
