const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const dotenv = require("dotenv");
const passport = require("passport");
const passportConfig = require("./passport");
const path = require("path");
const nunjucks = require("nunjucks");
const { sequelize } = require("./models");

const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const followRouter = require("./routes/follow");
const likeRouter = require("./routes/like");
const postingRouter = require("./routes/posting");
const authRouter = require("./routes/auth");
const boardRouter = require("./routes/board");
const indexRouter = require("./routes");

dotenv.config();
passportConfig();

const app = express();
app.set("port", process.env.PORT || 3000);

app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => console.log("데이터베이스 연결 성공"))
  .catch((err) => console.error(err));

app.use(
  morgan("dev"),
  express.static(path.join(__dirname, "public")),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(process.env.SECRET),
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  }),
  passport.initialize(),
  passport.session()
);

app.use("/user", userRouter);
app.use("/comment", commentRouter);
// app.use("/like", likeRouter);
app.use("/follow", followRouter);
app.use("/posting", postingRouter);
app.use("/auth", authRouter);
app.use("/board", boardRouter);
app.use("/", indexRouter);

app.use((req, res) =>
  res.render("index", {
    title: require("./package.json").name,
    port: app.get("port"),
  })
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
