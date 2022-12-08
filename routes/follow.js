const express = require("express");
const router = express.Router();
const { User, Follow } = require("../models");
const { isLoggedIn } = require("./checklogin");

/* 해당 사용자를 팔로우한 유저 아이디 요청 */
router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;

  // 존재하는 사용자인지 확인
  try {
    const result = await User.findOne({
      where: { id: userId },
    });

    if (!result) {
      res.send("존재하지 않는 사용자입니다.");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }

  try {
    const follwer = await Follow.findAll({
      where: { followee: userId },
      attributes: ["follower"],
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    // array of JSON(database row)
    if (follwer) res.json(follwer);
    else next(`존재하지 않는 사용자입니다.`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 팔로우
// parameter는 followee(팔로우 당하는 사람)가 된다.
router.post("/:id/do", isLoggedIn, async (req, res, next) => {
  const follower = req.user.id;
  const followee = req.params.id;

  // followee가 유효한 아이디인지 검사
  try {
    const result = await User.findOne({
      where: { id: followee },
    });

    if (!result) {
      res.send("존재하지 않는 사용자입니다.");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }

  // 이미 구독이 되어있으면, 팔로우 실패
  try {
    // row 생략 절대 금지
    const [row, created] = await Follow.findOrCreate({
      where: { follower, followee },
      defaults: { follower, followee },
    });
    if (created) res.send("팔로우 완료");
    else next("이미 팔로우한 사용자입니다.");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id/undo", isLoggedIn, async (req, res, next) => {
  const follower = req.user.id;
  const followee = req.params.id;

  // followee가 유효한 아이디인지 검사
  try {
    const result = await User.findOne({
      where: { id: followee },
    });

    if (!result) {
      res.send("존재하지 않는 사용자입니다.");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }

  // 팔로우 취소
  try {
    const result = await Follow.destroy({
      where: { follower, followee },
    });

    if (result) res.send("팔로우를 취소했습니다.");
    else next("이미 언팔로우되어 있는 사용자입니다.");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
