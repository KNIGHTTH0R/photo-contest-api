var express = require('express')
var api = require('./api')

module.exports = function (app) {
  app.use('/api', api)
  app.use('/', express.static('public'))
};
