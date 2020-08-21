'use strict';

const controller = require('./controller');

module.exports = function (app) {

    app.route('/addflight')
        .post(controller.addFlight);
    console.log("in routes")
    app.route('/cancelflight/:flightId')
        .delete(controller.cancelFlight)

};