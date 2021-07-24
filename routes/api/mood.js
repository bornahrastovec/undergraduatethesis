const express = require('express');
const router = express.Router();
const Mood = require('../../models/Mood.js');

router.post('/allmoods',
    // passport.authenticate('jwt'),
    async (req, res) => {
        const entries = await Mood.find({"userId": req.body.userId});
        return res.json({
            mood: entries
        })
    }
)
router.post('/mood', 
    async (req, res) => {
        const entry = new Mood({
            userId: req.body.userId,
            date: Date.now(),
            mood: req.body.mood,
            description: req.body.description
        });
        entry.save().then(e => {
            return res.status(201).json({
                success: true,
                message: "Uspješan upis raspoloženja!"
            });
        });
    }
)

module.exports = router;