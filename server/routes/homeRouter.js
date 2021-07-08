const express = require("express");
const homeRouter = express.Router();

const PAGE_TITLE = "대한민국 1등 배달앱, 배달의민족";

/**
 * 로그인을 해서 세션이 남아있는 경우 user 정보를,
 * 그렇지 않다면 null을 template에 넣어줍니다.
 */
homeRouter.get("/", (req, res) => {
  const userInfo = req.session?.user ? req.session.user : null;
  res.render("index", { title: PAGE_TITLE, user: userInfo });
});

module.exports = homeRouter;
