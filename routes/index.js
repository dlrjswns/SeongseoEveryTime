const express = require("express");
const { User, Comment, Follow, Like, Posting } = require("../models");

const router = express.Router();

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "description"],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/follows", async (req, res, next) => {
  try {
    const follows = await Follow.findAll({});
    res.json(follows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/likes", async (req, res, next) => {
  try {
    const likes = await Like.findAll({});
    res.json(likes);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/postings", async (req, res, next) => {
  try {
    const postings = await Posting.findAll({});
    res.json(postings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/data", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "description"],
      include: {
        model: Comment,
      },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
