const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan');

const flightDetailsRoutes = require('./Routes/flightDetails')

mongoose.connect("mongodb+srv://himali:himali@cluster1.eeyiw.mongodb.net/FlightDB?retryWrites=true&w=majority", { useNewUrlParser: true })

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})

app.use('/flight', flightDetailsRoutes);
app.use((req, res, next) => {
    console.log("app")
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app