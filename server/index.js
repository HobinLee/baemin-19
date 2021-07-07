const express = require("express");
const pug = require("pug");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.render("index", { title: "배민 로그인" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "배민 로그인" });
});

app.get("/signup/phone", (req, res) => {
  res.render("signup_phone", { title: "배민 로그인" });
});

app.get("/signup/terms", (req, res) => {
  res.render("signup_terms", { title: "배민 로그인" });
});

app.get("/signup/rest", (req, res) => {
  res.render("signup_rest", { title: "배민 로그인" });
});

app.listen(PORT, () => {
  console.log(`TESTING ON PORT : ${PORT}`);
});
