const express = require("express");
const pug = require("pug");
const path = require("path");

const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "getget", message: "testrtest" });
});

app.listen(PORT, () => {
  console.log(`TESTING ON PORT : ${PORT}`);
});
