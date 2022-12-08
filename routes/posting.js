const express = require("express");
const Posting = require("../models/posting");

const router = express.Router();

router
  .route("/:id/comments")
  .get(async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들을 가져옵니다
    const posting_id = req.params.id;
    try {
      const posting = await Posting.findOne({ where: { id: posting_id } });
      const comments = posting.getComments();
      res.json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    // 특정 게시글에 comment들을 등록합니다
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

  router
  .route("/:posting_id/comments/")
  .get(async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들을 가져옵니다
    const posting_id = req.params.id;
    try {
      const posting = await Posting.findOne({ where: { id: posting_id } });
      const comments = posting.getComments();
      res.json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    // 특정 게시글에 comment들을 등록합니다
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
