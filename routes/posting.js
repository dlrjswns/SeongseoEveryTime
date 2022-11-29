const express = require('express');
const Posting = require('../models/posting');

const router = express.Router();


router.route('/')
    .get((req, res) => {
        res.render('posting', {
            title: require('../package.json').name
        });
    })
    .post(async (req, res, next) => {
        const { userId, comment } = req.body;

        try {
            await Posting.create({ userId, comment });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
