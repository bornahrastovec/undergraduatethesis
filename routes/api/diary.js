const express = require('express');
const router = express.Router();
const DiaryEntry = require('../../models/DiaryEntry');


router.post('/entries',
    // passport.authenticate('jwt'),
    async (req, res) => {
        const entries = await DiaryEntry.find({ "userId": req.body.userId });
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
router.put('/entry/:id',
    // passport.authenticate('jwt'), 
    async (req, res) => {

        var conditions = { _id: req.params.id }

        const entry = await DiaryEntry.find(conditions);

        const update = await DiaryEntry.findByIdAndUpdate({ _id: req.params.id }, req.body);

        const updated = await DiaryEntry.findOne({ _id: req.params.id }).then(async (de) => {
            await res.json({
                entry: de,
                success: true,
                message: "Successful update!"
            })

        })
    }
);

router.delete('/entry/:id',
        async (req, res) => {
        var conditions = {_id: req.params.id} 

        await DiaryEntry.findByIdAndDelete(conditions).then(async () => {
            await res.json({
                success: true,
                message: "Succesfully deleted " + req.params.id
            })
        });

    }
)


module.exports = router;