const express = require("express");
const { Comment } = require("../models");
const { isLoggedIn } = require("./checklogin");
const formatterService = require("../service/formatterService");

const router = express.Router();

router
  .route("/:posting_id/comments")
  .get(async (req, res, next) => {
    // 특정 게시글에 존재하는 comment들을 조회하는 API
    const posting_id = req.params.posting_id;
    try {
      const comments = await Comment.findAll({
        where: { posting_id: posting_id },
      });

      // 댓글이 없는 경우
      if (comments.length == 0) res.json(formatterService.responseNoDataFormat("failure", `${id}에 해당하는 댓글 없음`));
      else res.json(formatterService.responseDataFormat("success", "특정 게시글 comments 조회 성공", comments));
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
      await Comment.create({
        user_id,
        posting_id,
        content,
      });

      res.json(formatterService.responseNoDataFormat("success", "특정 게시글에 comments 등록 성공"));
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

      if (result) res.json(formatterService.responseNoDataFormat("success", "comment 삭제 성공"));
      else res.json(formatterService.responseNoDataFormat("failure", "comment 삭제 실패"));
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

      if (result.every((x) => x == 1)) res.json(formatterService.responseNoDataFormat("success", `${id} 댓글 수정 완료`));
      else res.json(formatterService.responseNoDataFormat("failure", "comment 수정 실패"));
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
