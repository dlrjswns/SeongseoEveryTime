const express = require("express");
const { Posting, User } = require("../models");
const { isLoggedIn } = require("./checklogin");
const router = express.Router();

router
  .route("/")
  .get(isLoggedIn, async (req, res, next) => {
    // 모든 게시글 조회
    try {
      const postings = await Posting.findAll({
        attributes: ["id", "title", "content", "created_at", "updated_at"],
        include: {
          model: User,
          attributes: ["name"],
        },
      });
      res.json(postings);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const { title, content } = req.body; // Posting 등록할때 받기위한 데이터
    const user_id = req.user.id;
    try {
      // create 생성
      const result = await Posting.create({
        title,
        content,
        user_id,
      });
      //res.redirect("/"); // 게시글 작성이 완료되면 root path로 이동
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

router.route("/:id").get(isLoggedIn, async (req, res, next) => {
  // 특정 아이디에 해당하는 게시글 가져오기
  try {
    const posting = await Posting.findAll({
      where: { user_id: req.params.id },
    });

    if (!posting) res.send("작성한 게시글 없음");
    else res.json(posting);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:posting_id/edit", isLoggedIn, async (req, res, next) => {
  // 내 게시글만 수정 가능
  // 특정 아이디에 해당하는 게시글 수정하기
  try {
    const result = await Posting.update(
      {
        // 이 부분에 created_at은 어떻게 해야할지 찾아봐야됨
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.posting_id, user_id: req.user.id },
      }
    );

    if (result) {
      console.log("수정완료");
      res.json(result);
      // res.redirect("/"); // 게시글 수정이 완료되면 root path로 이동
    } else next("Not updated!");
  } catch (err) {
    next(err);
  }
});

// 특정 게시글을 삭제하기
router.get("/:posting_id/remove", isLoggedIn, async (req, res, next) => {
  try {
    const result = await Posting.destroy({
      where: { id: req.params.posting_id, user_id: req.user.id },
    });

    if (result) res.send(`${req.params.posting_id} 게시글 삭제 완료`);
    else next(`There is no posting with ${req.params.posting_id}.`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
