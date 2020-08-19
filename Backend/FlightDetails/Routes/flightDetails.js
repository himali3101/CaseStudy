const express = require('express')
const router = express.Router()

const Flight = require('../Model/FlightDetails');
const mongoose = require('mongoose');
const { json } = require('body-parser');

router.get('/', (req, res, next) => {
    Flight.find()
        .select('flightName from to fare _id')
        .exec()
        .then(docs => {
            if (docs) {
                const response = {
                    count: docs.length,
                    flight: docs.map(doc => {
                        return {
                            flightName: doc.flightName,
                            from: doc.from,
                            to: doc.to,
                            fare: doc.fare,
                            _id: doc._id
                        }
                    })
                }
                console.log(docs);
                res.status(200).json(response);
            }
            else {
                res.status(404).json({
                    message: "No Flights Available "
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.get('/:flightId', (req, res, next) => {
    const id = req.params.flightId;
    Flight.findById(id)
        .select('flightName from to fare _id')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    flight: {
                        flightName: doc.flightName,
                        from: doc.from,
                        to: doc.to,
                        fare: doc.fare,
                        _id: doc._id
                    }
                }
                console.log(doc);
                res.status(200).json(response);
            }
            else {
                res.status(404).json({
                    message: "No Valid entry found for provided ID"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})

router.post('/add', (req, res, next) => {
    console.log("add")
    const flight = new Flight({
        _id: new mongoose.Types.ObjectId,
        flightName: req.body.flightName,
        from: req.body.from,
        to: req.body.to,
        fare: req.body.fare
    });

    flight.save()
        .then(result => {
            res.status(200).json({
                flight: flight
            })
        })
})

router.patch('/:flightId', (req, res, next) => {
    const id = req.params.flightId;
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
})

module.exports = router
