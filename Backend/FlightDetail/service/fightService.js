const flightDao = require('../dao/flightDao')
flightDao.mongoConnect();
const Flight = require('../model/FlightDetails')
const mongoose = require('mongoose')

const flightService = {
    addFlight: function (req, res) {
        const flight = new Flight({
            _id: new mongoose.Types.ObjectId,
            flightName: req.body.flightName,
            from: req.body.from,
            to: req.body.to,
            date: new Date(req.body.date),
            fare: req.body.fare
        })
        Promise.resolve(flightDao.addFlight(flight))
            .then(result => {
                res.status(200).json({
                    flight: flight
                })
            })
    },
    cancelFlight: function (flightId) {
        Promise.resolve(flightDao.cancelFlight(flightId))
            .then(result => {
                return result
            })
    }
}

module.exports = flightService