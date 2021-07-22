const express = require('express');
const router = express.Router();
const Goal = require('../../models/Goal.js');

router.post('/goals',
    // passport.authenticate('jwt'),
    async (req, res) => {
        const entries = await Goal.find({"userId": req.body.userId});
        return res.json({
            mood: entries
        })
    }
)
router.post('/goal', 

    async (req, res) => {

        const entry = new Goal({
            userId: req.body.userId,
            date: Date.now(),
            dateOfPlannedAchievment: req.body.dateOfPlannedAchievment,
            description: req.body.description,
            shortOverview: req.body.shortOverview
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