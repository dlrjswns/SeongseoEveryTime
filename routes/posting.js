const express = require("express");
const { Comment, Posting } = require("../models");
const { isLoggedIn } = require("./checklogin");

const router = express.Router();

router
  .route("/:posting_id/comments")
  .get(async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들을 가져옵니다
    const posting_id = req.params.posting_id;
    try {
      const posting = await Posting.findOne({ where: { id: posting_id } });
      const comments = posting.getComments();
      res.json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(isLoggedIn, async (req, res, next) => {
    // 특정 게시글에 comment들을 등록합니다
    const { content } = req.body;
    const posting_id = req.params.posting_id;
    const user_id = req.user.id;
    try {
      const comment = await Comment.create({
        user_id,
        posting_id,
        content,
      });
      res.json(comment);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router
  .route("/:posting_id/comments/:comment_id")
  .get(async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들중 특정 comment를 삭제
    const posting_id = req.params.posting_id;
    const comment_id = req.params.comment_id;
    try {
      const comment = await Comment.destroy({
        where: { comment_id: comment_id },
      });
      res.json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들중 특정 comment를 수정
    const { posting_id, content } = req.body;
    try {
      const comment = await Comment.create({
        posting_id,
        content,
      });
      res.json(comment);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
