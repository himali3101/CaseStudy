const mongoose = require('mongoose');
var user = require('../Model/User')

var userDao = {
    connectMongo: function () {
        mongoose.connect("mongodb+srv://himali:himali@cluster1.eeyiw.mongodb.net/UserProfile?retryWrites=true&w=majority", { useNewUrlParser: true });
    },
    addUser: function (user) {
        return user.save()
            .then(result => {
                console.log(result)
                return result
            })
            .catch(err => {
                return err
            })
    },
    findUser: function (email) {
        return user.find({ email })
            .exec()
            .then(data => {
                let count = 0
                count = data.length
                if (count >= 1) {
                    console.log("******" + data.length)
                    return true
                }
                else {
                    console.log("Inside dao else")
                    return false
                }
            })
    }
}

module.exports = userDao

