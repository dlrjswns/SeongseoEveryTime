const express = require("express");
const { Posting } = require("../models");
const { isLoggedIn } = require("./checklogin");
const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, async (req, res, next) => {
    try {
      const postings = await Posting.findAll({
        attributes: ["title", "content", "created_at", "updated_at"],
      });
      res.json(postings);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const { title, content } = req.body; // Posting 등록할때 받기위한 데이터
    try {
      // create 생성
      await Posting.create({
        title,
        content,
      });
      res.redirect("/"); // 게시글 작성이 완료되면 root path로 이동
    } catch (err) {
      next(err);
    }
  });

router
  .route("/:id")
  .get(isLoggedIn, async (req, res, next) => {
    // 특정 아이디에 해당하는 게시글 가져오기
    try {
      const posting = await Posting.findOne({
        where: { id: req.params.id },
      });
      res.json(posting);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    // 특정 아이디에 해당하는 게시글 수정하기
    try {
      const result = await Posting.update(
        {
          // 이 부분에 created_at은 어떻게 해야할지 찾아봐야됨
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: { id: req.params.id },
        }
      );
      if (result) {
        console.log("수정완료");
        res.redirect("/"); // 게시글 수정이 완료되면 root path로 이동
      } else next("Not updated!");
    } catch (err) {
      next(err);
    }
  });

router.route("/delete/:id").get(async (req, res, next) => {
  // 특정 게시글을 삭제하기
  try {
    const result = await Posting.destroy({
      where: { id: req.params.id },
    });
    if (result) next();
    else next(`There is no posting with ${req.params.id}.`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
