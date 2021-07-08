const express = require("express");
const DB = require("../db/db.json");
const crypto = require("crypto");

const authRouter = express.Router();
const TEMPORARY_REDIRECT_CODE = 307;
const PAGE_TITLE = "대한민국 1등 배달앱, 배달의민족";

/**
 * 만약 기존에 로그인 했던 유저라면,
 * auth 페이지 접근 시 home으로 redirect 합니다.
 */
authRouter.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect(TEMPORARY_REDIRECT_CODE, "/");
  }

  res.render("login", { title: PAGE_TITLE });
});

/**
 * password를 비교하였을 때,
 * 일치하지 않으면 null을 반환합니다.
 * 일치한다면 세션에 유저 정보를 반영하고,
 * user info를 반환합니다.
 */

authRouter.post("/login", (req, res) => {
  if (!checkPassword(req.body.email, req.body.pw)) {
    return res.json({ user: null });
  }

  const { email, pw, ...rest } = DB[req.body.email];
  req.session.user = rest;
  res.json({ user: rest });
});

/**
 * Hashing 된 Password를
 * DB에 있는 Password와 비교합니다.
 */
const checkPassword = (email, pw) => {
  const hashedPW = crypto.createHash("sha512").update(pw).digest("base64");
  return DB[email] && DB[email].pw === hashedPW;
};

/**
 * 로그아웃 요청 시,
 * 기존 세션에 있던 user 데이터를 null로 변경합니다.
 */
authRouter.get("/logout", (req, res) => {
  req.session.user = null;
  res.json({ httpStatus: "OK" });
});

/**
 * 회원가입 시,
 * DB에 해당 email 이 있는지 확인합니다.
 */
authRouter.get("/check", (req, res) => {
  const { email } = req.query;

  const isUserExists = DB[email] ? true : false;
  res.json({ httpStatus: "OK", isUserExists });
});

module.exports = authRouter;
