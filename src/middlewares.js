import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Metube";
  res.locals.loggedInUser = req.session.user;
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "먼저 로그인을 해주십시오.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "허용되지 않은 접근입니다.");
    return res.redirect("/");
  }
};

export const uploadAvatar = multer({ dest: "uploads/avatars/", limits: { fileSize: 3000000 } });
export const uploadVideo = multer({ dest: "uploads/videos/", limits: { fileSize: 10000000 } });
