const express = require('express');
const router = express.Router();
const User = require('../../models/User');


router.get('/users',
    // passport.authenticate('jwt'),
    async (req, res) => {
        console.log("Ran get users");
        const users = await User.find({});
        return res.json({
            users: users
        })
    }
)

router.post('/users/delete',
    // passport.authenticate('jwt'),
    async (req, res) => {
        console.log("Ran delete user");
        const users = await User.findOneAndDelete({_id: req.body.id}, null, (err, doc, res) => {
            if (err) {
                console.log(err);
            } else {
                return res.json({
                    doc: doc,
                    res: res
                })
            }
        })
    }
)

router.post('/users/makeadmin',
    // passport.authenticate('jwt'),
    async (req, res) => {
        console.log("Ran make user admin");
        const users = await User.findOneAndUpdate({_id: req.body.id}, {role: 'Admin'}, {new: true}, (err, doc, res) => {
            if (err) {
                console.log(err);
            } else {
                return res.json({
                    doc: doc,
                    res: res
                })
            }
        })
    }
)

module.exports = router;