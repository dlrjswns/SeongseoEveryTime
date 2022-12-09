const express = require("express");

const User = require("../models/user");
const { isLoggedIn } = require("./checklogin");
const formatterService = require("../service/formatterService");

const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

//회원가입
router
  .route("/join")
  .get((req, res, next) => {
    try {
      res.json(formatterService.successResponseFormat("회원가입 페이지 가져오기 성공", null));
      //res.render("join");
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const { id, password, name, phone, address } = req.body; // 회원가입하고자하는 유저정보

    const user = await User.findOne({ where: { id: id } });
    if (user) {
      next(`${id}는 이미 등록된 사용자 아이디입니다.`);
      return;
    }

    try {
      const hash = await bcrypt.hash(password, 12);
      const user = await User.create({
        id: id,
        password: hash,
        name: name,
        phone: phone,
        address: address,
      });
      res.json(formatterService.successResponseFormat(`${id} 사용자 회원가입 성공`, user));
      //res.send(`${id} 사용자 회원가입 성공`);
      //res.redirect("/");
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

//로그인
router
  .route("/login")
  .get((req, res, next) => {
    try {
      res.json(formatterService.successResponseFormat("로그인 페이지 가져오기 성공", null));
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post((req, res, next) => {
    console.log(req.body);

    passport.authenticate("local", (authError, user, info) => {
      if (user) {
        req.login(user, (loginError) => res.json(formatterService.successResponseFormat("Login Success", null)));
        res.locals.isAuthenticated = isLoggedIn;
      } else res.json(formatterService.failureResponseFormat(`${info.message}`));
    })(req, res, next);
  });

//로그아웃
router.get("/logout", (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.json(formatterService.failureResponseFormat("사용자 로그아웃"));
    //res.send("사용자 로그아웃");
    //res.redirect("/");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 마이페이지
router
  .route("/mypage")
  .get((req, res, next) => {
    try {
      res.locals.isAuthenticated = isLoggedIn; //로그인이 되었는지 안됬는지
      res.locals.user = req.user;
      res.render("mypage");
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

  .post(async (req, res, next) => {
    console.log(req.body);
    try {
      const hash = await bcrypt.hash(req.body.password, 12);
      const result = await User.update(
        {
          password: hash,
          name: req.body.name,
          address: req.body.address,
        },
        {
          where: { id: req.body.id },
        }
      );
      if (result) res.redirect("/");
      else next("Not updated!");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
