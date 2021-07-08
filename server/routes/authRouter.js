const express = require("express");
const DB = require("../db/db.json");

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  console.log(req.body);
  if (DB[req.body.email].pw === req.body.pw) {
    req.session.user = {
      user: DB[req.body.email],
    };
  }

  res.json({ user: req.session.user });
});

authRouter.get("/", (req, res) => {
  res.render("login", { title: "배민 로그인" });
});

authRouter.get("/logout", (req, res) => {
  // FIXME: logout DB 저장에 문제 있음
  //   console.log('logout');
  //   req.session.user = null;
  //   console.dir(req.session);
  //   res.redirect(307, '/');
});

authRouter.get("/check", (req, res) => {
  const { email } = req.query;

  const isUserExists = DB[email] ? true : false;

  res.json({ httpStatus: "OK", isUserExists });
});

module.exports = authRouter;
