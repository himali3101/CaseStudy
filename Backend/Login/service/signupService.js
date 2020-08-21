const userDao = require('../dao/userDao');
userDao.connectMongo();
const User = require('../Model/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


var signupService = {
    signup: function (req, res) {
        Promise.resolve(userDao.findUser(req.body.email)).then(user => {
            console.log(user)
            if (user == true) {
                return res.status(409).json({
                    message: "User already exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                        });
                        Promise.resolve(userDao.addUser(user))
                            .then(result => {
                                res.status(200).send(result)
                            })

                    }
                })
            }
        })
    }
}

module.exports = signupService