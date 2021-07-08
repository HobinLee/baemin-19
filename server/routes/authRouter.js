const express = require("express");
const DB = require("../db/db.json");

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(307, '/');
  } else {
    res.render("login", { title: "배민 로그인" });
  }
});

const checkPassword = (email, pw) => {
  return DB[email] && DB[email].pw === pw;
}

authRouter.post("/login", (req, res) => {
  // 올바른 로그인
  if (checkPassword(req.body.email, req.body.pw)) {
    const {email, pw, ...rest} = DB[req.body.email];
    req.session.user = {
      ...rest
    };
    res.json({ user : req.session.user });
  } else { // 로그인 실패
    res.json({ user : null });
  }
});

authRouter.get("/logout", (req, res) => {
  req.session.user = null;

  res.json({httpStatus: "OK"});
})

authRouter.get("/check", (req, res) => {
  const { email } = req.query;

  const isUserExists = DB[email] ? true : false;

  res.json({ httpStatus: "OK", isUserExists });
});

module.exports = authRouter;
