const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const DiaryEntry = require('../../models/DiaryEntry');


router.post('/entries',
    // passport.authenticate('jwt'),
    async (req, res) => {
        const entries = await DiaryEntry.find({"userId": req.body.userId});
        return res.json({
            entries: entries
        })
    }
)

router.post('/entry',
    // passport.authenticate('jwt'), 
    async (req, res) => {
        const entry = new DiaryEntry({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
            moodRate: req.body.moodRate,
            date: Date.now()
        })
        entry.save().then(de => {
            return res.status(201).json({
                success: true,
                message: "Uspješan unos u dnevnik!"
            });
        });
    }
);

module.exports = router;