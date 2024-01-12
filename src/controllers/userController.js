import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("users/join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const usernameExists = await User.exists({ username: username });
  const emailExists = await User.exists({ email: email });
  if (usernameExists) {
    return res.status(400).render("users/join", { pageTitle: "Join", errorMessage: "This username is already taken." });
  }
  if (emailExists) {
    return res.status(400).render("users/join", { pageTitle: "Join", errorMessage: "This e-mail is already taken." });
  }
  // const exists = await User.exists({ $or: [{ username: username }, { email: email }] });
  // if (exists) {
  //   return res.render("users/join", { pageTitle: "Join", errorMessage: "This e-mail OR username is already taken." });
  // }
  if (password !== password2) {
    return res
      .status(400)
      .render("users/join", { pageTitle: "Join", errorMessage: "Password confirmation does not match." });
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
    return res.status(400).render("users/join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => res.render("users/login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const pageTitle = "Login";
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialAccount: false }); // = { username:username }
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("users/login", {
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
        socialAccount: true,
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
  req.session.user = null;
  res.locals.loggedInUser = req.session.user;
  req.session.loggedIn = false;
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, email, location }, //form에서 'name'을 쓰지 않으면 적용되지 X
    file,
  } = req;
  // const id = req.session.user.id;
  // const { name, email, location } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.location : avatarUrl,
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
  req.flash("success", "변경되었습니다.");
  return res.redirect(`${_id}`);
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialAccount === true) {
    req.flash("error", "소셜 로그인 회원에게는 불가능한 기능입니다.");
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The current password is incorrect.",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "The password does not match the confirmation.",
    });
  }
  user.password = newPassword;
  await user.save(); // hash를 작동시키기 위함
  //req.session.user.password = user.password; -> session에서 정보를 받으면 업데이트도 해줘야 함
  req.flash("info", "비밀번호가 변경되었습니다.");
  return res.redirect("/users/logout");
};

export const remove = (req, res) => res.send("Delete User");

export const users = async (req, res) => {
  const { id } = req.params; // => public page이기 때문에 session을 사용해서 가져오는 것이 X
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      //dobule populate
      path: "owner",
      model: "User",
    },
  });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User not found" });
  }
  return res.render("users/profile", { pageTitle: `${user.name}'s Profile`, id, user });
};
