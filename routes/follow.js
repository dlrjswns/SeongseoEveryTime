const express = require("express");
const router = express.Router();
const { User, Follow } = require("../models");
const { isLoggedIn } = require("./checklogin");

/* 해당 사용자를 팔로우한 유저 아이디 요청 */
router.get("/:user_id", async (req, res, next) => {
  const id = req.params.user_id; // 사용자 아이디

  // 존재하는 사용자인지 확인
  try {
    const result = await User.findOne({
      where: { id: id },
    });

    if (!result) {
      res.send(`${id}에 해당하는 사용자가 존재하지 않습니다.`);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }

  try {
    const follwers = await Follow.findAll({
      where: { followee: id },
      attributes: ["follower"],
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    // array of JSON(database row)
    if (follwers.length == 0) res.send(`${id}에 해당하는 사용자를 팔로우한 사람 없음`);
    else res.json(follwers);
    // if (follwer) res.json(follwer);
    // else next(`존재하지 않는 사용자입니다.`);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// 팔로우
// parameter는 followee(팔로우 당하는 사람)가 된다.
router.post("/:user_id/do", isLoggedIn, async (req, res, next) => {
  const follower = req.user.id;
  const followee = req.params.user_id; // followee(팔로우 당하는 사람)

  // followee가 유효한 아이디인지 검사
  try {
    const result = await User.findOne({
      where: { id: followee },
    });

    if (!result) {
      res.send(`${followee}에 해당하는 사용자없음`);
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
    if (created) res.send(`${followee}에 해당하는 사용자 팔로우 완료`);
    else next(`${followee}에 해당하는 사용자는 이미 팔로우한 사용자입니다.`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:user_id/undo", isLoggedIn, async (req, res, next) => {
  const follower = req.user.id;
  const followee = req.params.user_id;

  // followee가 유효한 아이디인지 검사
  try {
    const result = await User.findOne({
      where: { id: followee },
    });

    if (!result) {
      res.send(`${followee}에 해당하는 사용자없음`);
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

    if (result) res.send(`${followee}에 해당하는 사용자 팔로우를 취소했습니다.`);
    else next(`${followee}에 해당하는 사용자는 이미 언팔로우되어있습니다.`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
