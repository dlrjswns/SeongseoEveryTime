const express = require("express");
const router = express.Router();
const { User, Follow } = require("../models");

/*
GET: /follow/:id -> 해당 사용자를 팔로우한 유저 아이디 요청
POST: /follow/:id/do -> 해당 사용자 팔로우
POST: /follow/:id/undo -> 언팔로우
*/

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

module.exports = router;
