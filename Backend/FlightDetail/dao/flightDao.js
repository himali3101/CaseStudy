const mongoose = require('mongoose')
const flight = require('../model/FlightDetails')

const flightDao = {
    mongoConnect: function () {
        mongoose.connect("mongodb+srv://himali:himali@cluster1.eeyiw.mongodb.net/FlightDB?retryWrites=true&w=majority", { useNewUrlParser: true })
    },
    addFlight: function (flight) {
        return flight.save()
            .then(result => {
                return result
            })
    },
    cancelFlight: function (flightId) {
        return flight.findByIdAndRemove({ _id: flightId })
            .exec()
            .then(result => {
                console.log("dao" + result)
                if (result)
                    return result
            })
            .catch(err => {
                return err
            })
    }
}

module.exports = flightDao