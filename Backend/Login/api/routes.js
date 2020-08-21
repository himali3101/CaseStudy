'use strict';

const controller = require('./controller');

module.exports = function (app) {

    app.route('/signup')
        .post(controller.signup);
    app.route('/login')
        .post(controller.login);
};