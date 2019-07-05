const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { SECURED_KEY } = require('../config/configure');


exports.register = async function (req, res) {
    const { name, username, email, password } = req.body.user;

    User.findOne({ email }, function (e, doc) {
        if (doc) {
            return res.status(422).json({ msg: "The user already exists" });
        }
        const user = new User({ name, username, email, password });
        user.save(function (error, doc) {
            if (error || !doc) {
                return res.status(500).json({ msg: " Server error" });
            }
            const { name, email, _id } = doc;

            return res.status(200).json({ data: { name, username, email, id: _id } });
        });
    });
}

exports.login = async function (req, res) {
    const { email, password } = req.body.user;
    console.log(req.body.user)
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err: 'login error'
                });

            } else if (!user) {
                return res.status(401).json({
                    err: 'User not found.'
                })

            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    // Stay logged in for 7 days
                    const token = jwt.sign({ id: user._id }, SECURED_KEY, {
                        expiresIn: 60 * 60 * 24 * 7
                    });
                    return res.status(200).json({
                        success: 'success',
                        token
                    })
                } else {
                    return res.status(500).json({ err: 'Password fail' });
                }
            })
        });

}