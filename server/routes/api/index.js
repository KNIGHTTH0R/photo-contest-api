var express = require('express');
var contests = require('./contests')

var router = module.exports = express.Router();

router.use('/contests', contests)
