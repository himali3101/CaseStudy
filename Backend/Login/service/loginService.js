const userDao = require('../dao/userDao');
userDao.connectMongo();
const User = require('../Model/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const loginService = {
    login: function (req, res) {
        Promise.resolve(User.find({ email: req.body.email })).then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        })
                    return res.status(200).json({
                        message: 'Auth successful',
                        Token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })

    }
}

module.exports = loginService