const express = require("express");
const router = express.Router();
const { Like } = require("../models");
const { isLoggedIn } = require("./checklogin");

// POST: /like/:posting_id/do -> 좋아요 요청
// DELETE: /like/:posting_id/undo -> 좋아요 취소 요청

// 게시글에 좋아요
router.post("/:posting_id/do", isLoggedIn, async (req, res, next) => {
  const user_id = req.user.id;
  const posting_id = req.params.posting_id;

  // 좋아요 중복 금지
  try {
    // row 생략 절대 금지
    const [row, created] = await Like.findOrCreate({
      where: { user_id, posting_id },
      defaults: { user_id, posting_id },
    });

    if (created) res.send(`${user_id} 사용자가 ${posting_id} 게시글에 [좋아요]하였습니다.`);
    else next("이미 좋아요한 글입니다.");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 게시글 좋아요 취소
router.delete("/:posting_id/undo", isLoggedIn, async (req, res, next) => {
  const user_id = req.user.id;
  const posting_id = req.params.posting_id;

  try {
    const result = await Like.destroy({
      where: { user_id, posting_id },
    });

    if (result) res.send(`${user_id} 사용자가 ${posting_id} 게시글에 [좋아요]를 취소하였습니다.`);
    else next("이미 좋아요를 누르지 않은 글입니다.");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
