const express = require("express");
const fs = require("fs");
const crypto = require("crypto");

const DB = require("../db/db.json");
const signupRouter = express.Router();

const TEMPORARY_REDIRECT_CODE = 307;
const PAGE_TITLE = "대한민국 1등 배달앱, 배달의민족";

/**
 * SIGNUP_SUB_PATHS에 해당하는 path로 GET 요청이 올 경우,
 * 기존에 로그인 한 유저라면 home으로 redirect,
 * 로그인 하지 않은 유저라면 해당 페이지로 render 합니다.
 */

const SIGNUP_SUB_PATHS = ["/terms", "/phone", "/rest"];
signupRouter.get(SIGNUP_SUB_PATHS, (req, res) => {
  if (req.session.user) {
    return res.redirect(TEMPORARY_REDIRECT_CODE, "/");
  }

  const subPath = req.url.slice(1);
  res.render(`signup_${subPath}`, { title: PAGE_TITLE });
});

/**
 * POST ~/signup 요청 시,
 * DB에 hashing 된 password를 저장합니다.
 */
signupRouter.post("/", ({ body, session }, res) => {
  session.user = body.userData;

  const { email, pw, ...rest } = body.userData;
  const copiedDB = { ...DB };

  const hashedPW = crypto.createHash("sha512").update(pw).digest("base64");
  copiedDB[email] = { ...rest, pw: hashedPW };

  fs.writeFileSync("server/db/db.json", JSON.stringify(copiedDB));
  res.json({ httpStatus: "OK" });
});

module.exports = signupRouter;
