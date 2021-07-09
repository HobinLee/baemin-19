const express = require("express");
const pug = require("pug");
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const homeRouter = require("./routes/homeRouter");
const authRouter = require("./routes/authRouter");
const signupRouter = require("./routes/signupRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(
  session({
    secret: "Si2_#!wiZ0*j!@21lsNd",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: { secure: false },
  })
);

app.use(express.static(__dirname));

app.use("/", homeRouter);
app.use("/auth", authRouter);
app.use("/signup", signupRouter);
app.all("*", (req, res) => {
  const PAGE_TITLE = "대한민국 1등 배달앱, 배달의민족";
  res.render("404page", { title: PAGE_TITLE });
});

app.listen(PORT, () => {
  console.log(`TESTING ON PORT : ${PORT}`);
});
