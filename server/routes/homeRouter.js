const express = require('express');
const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  if(req.session?.user) { // 로그인 했을 때
    res.render("index", { title: "배민 로그인", user: req.session.user });
  } else { //로그인이 아닐 때
    res.render("index", { title: "배민 로그인", user: null });
  }
});

module.exports = homeRouter;