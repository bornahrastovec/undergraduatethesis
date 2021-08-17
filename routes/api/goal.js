const express = require('express');
const router = express.Router();
const Goal = require('../../models/Goal.js');

router.post('/allgoals',
    // passport.authenticate('jwt'),
    async (req, res) => {

        console.log("Hit /allgoals, userId: ", req.body.userId)
        const entries = await Goal.find({ "userId": req.body.userId });

        return res.json({
            goals: entries
        })
    }
)
router.post('/goal',

    async (req, res) => {

        const entry = new Goal({
            userId: req.body.userId,
            date: Date.now(),
            dateOfPlannedAchievment: req.body.dateOfPlannedAchievment,
            how: req.body.how,
            why: req.body.why,
            what: req.body.what
        });

        entry.save().then(e => {
            return res.status(201).json({
                success: true,
                message: "Uspješan upis raspoloženja!"
            });
        });
    }
)

router.put('/goal/:id',

    async (req, res) => {

        var conditions = { _id: req.params.id }

        const entry = await Goal.find(conditions);

        const update = await Goal.findByIdAndUpdate({ _id: req.params.id }, req.body);

        const updated = await Goal.findOne({ _id: req.params.id }).then(async (de) => {
            
            await res.json({
                entry: de,
                success: true,
                message: "Successful update!"
            })

        })
    }
)


module.exports = router;