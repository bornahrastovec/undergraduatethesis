const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require('../../models/User');

/**
 * @route POST api/users/register
 * @desc Register the user 
 * @access Public
 */

router.post('/register', (req, res) => {
    let {name, surname, username, password, passwordRepeat, email, date } = req.body

    if(password !== passwordRepeat) {
        return res.status(400).json({
            msg: "Lozinke se ne podudaraju"
        });
    }

    User.findOne({username: username}).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Korisničko ime je već zauzeto!"
            });    
        }
    })
    User.findOne({email: email}).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "EMail se već koristi!"
            });    
        }
    })

    let user = new User({
        name,
        surname,
        username,
        password,
        email
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Korisnik uspješno registriran!"
                });
            });
        });
    });
})

/**
 * @route POST api/users/login
 * @desc Login the user
 * @access Public
 */

router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({username: req.body.username}).then(user => {
        if (!user) {
            debugger;
            return res.status(404).json({
                msg: "Korisničko ime nije pronađeno",
                success: false
            });
        }

        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username
                }
                jwt.sign(payload, key, {
                    expiresIn: 604800
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        user: user,
                        token: `Bearer ${token}`,
                        msg: 'Uspješna prijava!'
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Netočna lozinka",
                    success: false
                });    
            }
        })
    })
})

/**
 * @route GET api/users/profile
 * @desc Get user profile
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user
    })
})

module.exports = router;