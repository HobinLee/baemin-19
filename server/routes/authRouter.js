const express = require("express");
const DB = require("../db/db.json");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const TEMPORARY_REDIRECT_CODE = 307;
const PAGE_TITLE = "대한민국 1등 배달앱, 배달의민족";

/**
 * Hashing 된 Password를
 * DB에 있는 Password와 비교합니다.
 */
const checkPassword = async (email, pw) => {
  const result = bcrypt.compareSync(pw, DB[email].pw);
  
  return result;
};

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
authRouter.post("/login", async (req, res) => {
  const WAIT_TIME = 1000;
  try {
    const {email, pw} = req.body;
    const isPWCorrect = await checkPassword(email, pw);

    // 알고리즘에 걸리는 시간 파악에 혼동을 주기 위해 몇 초 뒤에 결과를 반환하도록 했습니다.
    setTimeout(() => {
      if (isPWCorrect) {
        const { password: pw, ...userInfo } = DB[email];
  
        req.session.user = userInfo;
        res.json({ user: userInfo });
      } else {
        res.json({ user: null });
      }
    }, WAIT_TIME);
  } catch (err) {
    res.json({ user: null });
  }
});

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
