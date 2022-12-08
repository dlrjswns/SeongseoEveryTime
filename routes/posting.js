const express = require("express");
const { Comment } = require("../models");
const { isLoggedIn } = require("./checklogin");

const router = express.Router();

router
  .route("/:posting_id/comments")
  .get(async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들을 가져옵니다
    const posting_id = req.params.posting_id;
    try {
      const comments = await Comment.findAll({
        where: { posting_id: posting_id },
      });

      // 댓글이 없는 경우
      if (comments.length == 0) res.send(`${id}에 해당하는 댓글 없음`);
      else res.json(comments);
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
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router
  .route("/:posting_id/comments/:comment_id")
  .delete(isLoggedIn, async (req, res, next) => {
    //특정 게시글에 존재하는 comment들중 특정 comment를 삭제
    const id = req.params.comment_id;
    const posting_id = req.params.posting_id;
    const user_id = req.user.id;
    try {
      const result = await Comment.destroy({
        where: { id: id, posting_id: posting_id, user_id: user_id },
      });

      if (result) res.send(`${id} 댓글 삭제 완료`);
      else next("삭제 실패");
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .put(isLoggedIn, async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들중 특정 comment를 수정
    const { content } = req.body;
    const id = req.params.comment_id;
    const posting_id = req.params.posting_id;
    const user_id = req.user.id;
    try {
      const result = await Comment.update({ content }, { where: { id: id, posting_id: posting_id, user_id: user_id } });

      if (result.every((x) => x == 1)) res.send(`${id} 댓글 수정 완료`);
      else next("수정 실패");
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
