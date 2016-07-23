var express = require('express')
var api = require('./api')

module.exports = function (app) {
  app.use('/api', api)
  app.use('/admin', express.static('public'))

  app.get('/', function (res, res) {
    res.redirect('/admin')
  })
}
