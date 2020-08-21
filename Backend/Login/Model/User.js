const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true  //unique doesn't help in validation it is only used for performance optimization
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userScheme)