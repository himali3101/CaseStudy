'use strict';

//var properties = require('../package.json')
//var distance = require('../service/distance');
var signupService = require('../service/signupService')
var loginService = require('../service/loginService')

var controllers = {
    signup: function (req, res) {
        signupService.signup(req, res)
    },
    login: function (req, res) {
        loginService.login(req, res)
    }
};

module.exports = controllers;