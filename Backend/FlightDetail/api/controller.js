'use strict';

const flightService = require('../service/fightService')

const controller = {
    addFlight: function (req, res) {
        flightService.addFlight(req, res);
    },
    cancelFlight: function (req, res) {
        const flightId = req.params.flightId
        console.log(req.params.flightId)
        Promise.resolve(flightService.cancelFlight(req.params.flightId))
            .then(result => {
                res.status(200).json({
                    message: "deleted"
                })
            })
            .catch(err => {
                console.log("error cancelling")
                res.status(500).json({ error: "error in canceling" })

            })

    }
}

module.exports = controller