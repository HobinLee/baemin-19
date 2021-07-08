const express = require('express');
const fs = require("fs");

const DB = require('../db/db.json');
const signupRouter = express.Router();

signupRouter.get("/phone", (req, res) => {
  res.render("signup_phone", { title: "배민 로그인" });
});

signupRouter.get("/terms", (req, res) => {
  res.render("signup_terms", { title: "배민 로그인" });
});

signupRouter.get("/rest", (req, res) => {
  res.render("signup_rest", { title: "배민 로그인" });
});

signupRouter.post("/", (req, res) => {
  const {email, ...rest} = req.body.userData;

  req.session.user = req.body.userData;
  
  const copiedDB = {...DB};

  copiedDB[email] = rest;
  //fs.writeFileSync('server/db/db.json', JSON.stringify(copiedDB));

  res.json({ httpStatus : "OK" });
})

module.exports = signupRouter;