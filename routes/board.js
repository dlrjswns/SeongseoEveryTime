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
      if (postings.length == 0) res.send(`작성한 게시글 없음`); // 어떤 사용자도 게시글을 작성하지않은 경우
      else res.json(postings);
      // res.json(postings);
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

router.route("/:user_id").get(isLoggedIn, async (req, res, next) => {
  // 특정 아이디에 해당하는 사용자가 작성한 모든 게시글 가져오기
  const user_id = req.params.user_id;
  try {
    const postings = await Posting.findAll({
      where: { user_id: user_id },
    });

    if (postings.length == 0) res.send(`${user_id}에 해당하는 사용자가 작성한 게시글 없음`);
    else res.json(postings);

    // if (!posting) res.send(`${user_id}에 해당하는 사용자가 작성한 게시글 없음`);
    // else res.json(posting);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/:posting_id/edit", isLoggedIn, async (req, res, next) => {
  /*
      내 게시글만 수정 가능
      특정 아이디에 해당하는 게시글 수정하기
  */
  const id = req.params.posting_id; // 수정하고자하는 게시글 아이디
  const user_id = req.user.id; // 로그인되어있는 사용자 아이디
  const { title, content } = req.body;

  try {
    const result = await Posting.update(
      {
        title: title,
        content: content,
      },
      {
        where: { id: id, user_id: user_id },
      }
    );

    if (result) {
      // 게시글 수정 성공
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
  const id = req.params.posting_id;
  const user_id = req.user.id; // 로그인되어있는 사용자 아이디

  try {
    const result = await Posting.destroy({
      where: { id: id, user_id: user_id },
    });

    if (result) res.send(`${id}에 해당하는 게시글 삭제 완료`); // 게시글 삭제에 성공
    else next(`There is no posting with ${id}.`);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
